import os, math
from flaskext.mysql import MySQL

class MapGenerator():
	def __init__(self, app):
		mysql = MySQL(app=app, host='localhost', user=os.environ['db_user'], password=os.environ['db_passwd'], db='keenanknights')
		self.connection = mysql.connect()
	
	def generateMaps(self, source, destinations):
		with self.connection.cursor() as cursor:
			destFloor = []
			sql = "select floor_num, room_pixel, hallway from room_pixels where room_num = %s"
			cursor.execute(sql, source)
			result = cursor.fetchone()
	
			if not result:
				print("source room does not exist")
				#TODO: IF ROOM DOES NOT EXIST
				pass
			srcFloor = result[0]
			srcPixel = result[1]
			srcHall = result[2]
			
			sql = "select floor_num, image_width, image_height, west_stairs, west_left_room, west_right_room, west_hallway, north_stairs, north_top_room, north_bot_room, north_hallway from floor_pixels where floor_num = %s"
			cursor.execute(sql, srcFloor)
			srcData = cursor.fetchone()
	
			if not srcData:
				print("source floor does not exist")
				#TODO: IF ROOM DOES NOT EXIST
				pass
			srcLocation = self.getRoomLocation(source, srcPixel, srcHall, srcData)
			srcFloorPixelMap = self.getWalkablePixels(srcData)
			paths = {}

			for dest in destinations:
				sql = "select floor_num, room_pixel, hallway from room_pixels where room_num = %s"
				cursor.execute(sql, dest)
				result = cursor.fetchone()
		
				if not result:
					print("destination room does not exist")
					#TODO: IF ROOM DOES NOT EXIST
					pass
				destFloor = result[0]
				destPixel = result[1]
				destHall = result[2]
				
				if destFloor == srcFloor:
					destLocation = self.getRoomLocation(dest, destPixel, destHall, srcData)
					pathLen = self.getTotalShortestPath(srcLocation, destLocation, srcFloorPixelMap, None, srcData, None)
				else:
					sql = "select floor_num, image_width, image_height, west_stairs, west_left_room, west_right_room, west_hallway, north_stairs, north_top_room, north_bot_room, north_hallway from floor_pixels where floor_num = %s"
					cursor.execute(sql, destFloor)
					destData = cursor.fetchone()
			
					if not destData:
						print("destination floor does not exist")
						#TODO: IF ROOM DOES NOT EXIST
						pass
					destFloorPixelMap = self.getWalkablePixels(destData)
					destLocation = self.getRoomLocation(dest, destPixel, destHall, destData)
					pathLen = self.getTotalShortestPath(srcLocation, destLocation, srcFloorPixelMap, destFloorPixelMap, srcData, destData)
				
				paths[dest] = pathLen
			
			closestDest = None
			shortestPathLen = math.inf
			path = []
			floors = ""
			for room, pLen in paths.items():

				if pLen[0] < shortestPathLen:
					shortestPathLen = pLen[0]
					path = pLen[1]
					floors = pLen[2]
					closestDest = room

			return {"room":closestDest, "pathLen":shortestPathLen, "path":path, "floors":floors}

	def drawLines(self, ctx, xVals, yVals):
		pass
	
	def getWalkablePixels(self, result):
		w, h = result[1], result[2]
		pixels = [[math.inf for y in range(h)] for x in range(w)]

		# make the west hallway walkable
		xPos = result[6]
		for i in range(result[3], len(pixels[0])):
			pixels[xPos][i] = 1
		
		# make the path to the west stairs walkable
		yPos = result[3]
		for i in range(result[6], result[5]+1):
			pixels[i][yPos] = 1

		# make the north hallway walkable
		yPos = result[10]
		for i in range(result[6], len(pixels)):
			pixels[i][yPos] = 1
		
		# make the path to the north stairs walkable
		xPos = result[7]
		for i in range(result[8], result[10]+1):
			pixels[xPos][i] = 1

		# for each room, make it walkable from that room to the hallway
		with self.connection.cursor() as cursor:
			sql = "select room_num, hallway, room_pixel from room_pixels where floor_num = %s"
			cursor.execute(sql, result[0])
			for row in cursor:
				if row[1] == 'North':
					roomXPos = row[2]
					if row[0] % 2 == 0:
						for i in range(result[8], result[10]+1):
							pixels[roomXPos][i] = 1
					else: 
						for i in range(result[10], result[9]+1):
							pixels[roomXPos][i] = 1
				else:
					roomYPos = row[2]
					if row[0] % 2 == 0:
						for i in range(result[4], result[6]+1):
							pixels[i][roomYPos] = 1
					else: 
						for i in range(result[6], result[5]+1):
							pixels[i][roomYPos] = 1	
			return pixels
	
	def getRoomLocation(self, roomNum, roomPixel, roomHall, floorData):
		if roomHall == "North":
			if roomNum % 2 == 0:
				return [roomPixel, floorData[8]]
			else:
				return [roomPixel, floorData[9]]
		else:
			if roomNum % 2 == 0:
				return [floorData[4], roomPixel]
			else:
				return [floorData[5], roomPixel]


	def getTotalShortestPath(self, srcLocation, destLocation, srcFloorPixelMap, destFloorPixelMap, srcData, destData):
		if destFloorPixelMap is None:
			# the cost is just the path from one to the other because they are on the same floor
			path = self.getShortestPath(srcLocation, destLocation, srcFloorPixelMap)
			return [path[0], path[1], [srcData[0]]]
		else:
			floors = [srcData[0], destData[0]]

			# start with the cost of path form source to west stairs on the source floor
			# then, add cost from west stairs to destination on the destination floor
			# finally, add the cost of taking the stairs
			westPoints = []
			westPath = self.getShortestPath(srcLocation, [srcData[5], srcData[3]], srcFloorPixelMap)
			tmp = self.getShortestPath([destData[5], destData[3]], destLocation, destFloorPixelMap)
			westPath[0] += tmp[0]
			westPath[0] += 400*abs(srcData[0] - destData[0])
			westPoints.append(westPath[1])
			westPoints.append(tmp[1])
			
			# start with the cost of path form source to north stairs on the source floor
			# then, add cost from north stairs to destination on the destination floor
			# finally, add the cost of taking the stairs 
			northPoints = []
			northPath = self.getShortestPath(srcLocation, [srcData[7], srcData[8]], srcFloorPixelMap)
			tmp = self.getShortestPath([destData[7], destData[8]], destLocation, destFloorPixelMap)
			northPath[0] += tmp[0]
			northPath[0] += 400*abs(srcData[0] - destData[0])
			northPoints.append(northPath[1])
			northPoints.append(tmp[1])
			
			if westPath[0] < northPath[0]:
				return [westPath[0], westPoints, floors]
			else:
				return [northPath[0], northPoints, floors]

	def getShortestPath(self, src, dest, pixelMap):
		cost = 0
		costMap = [x[:] for x in pixelMap]
		costMap[src[0]][src[1]] = 0
		marked = []
		queue = [src]
		while len(queue) != 0:
			curr = queue.pop(0)
			if curr not in marked:
				marked.append(curr)
				
				if curr[0] < len(pixelMap)-1:
					if pixelMap[curr[0]+1][curr[1]] != math.inf and [curr[0]+1,curr[1]] not in marked:
							costMap[curr[0]+1][curr[1]] += costMap[curr[0]][curr[1]]
							queue.append([curr[0]+1,curr[1]])
				
				if curr[0] > 0:
					if pixelMap[curr[0]-1][curr[1]] != math.inf and [curr[0]-1,curr[1]] not in marked:
						costMap[curr[0]-1][curr[1]] += costMap[curr[0]][curr[1]]
						queue.append([curr[0]-1,curr[1]])
				
				if curr[1] < len(pixelMap[0])-1:
					if pixelMap[curr[0]][curr[1]+1] != math.inf and [curr[0],curr[1]+1] not in marked:
						costMap[curr[0]][curr[1]+1] += costMap[curr[0]][curr[1]]
						queue.append([curr[0],curr[1]+1])
				
				if curr[1] > 0:
					if pixelMap[curr[0]][curr[1]-1] != math.inf and [curr[0],curr[1]-1] not in marked:
						costMap[curr[0]][curr[1]-1] += costMap[curr[0]][curr[1]]
						queue.append([curr[0],curr[1]-1])
		path = self.tracebackPath(dest, src, costMap)
		
		return [costMap[dest[0]][dest[1]], path]

	def tracebackPath(self, dest, src, costMap):
		curr = dest
		cost = costMap[curr[0]][curr[1]]
		points = [dest]
		while cost > 0:
			if costMap[curr[0]+1][curr[1]] == cost-1:
				while costMap[curr[0]+1][curr[1]] == cost-1:
					curr = [curr[0]+1, curr[1]]
					cost = costMap[curr[0]][curr[1]]
				points.append(curr)
				
			elif costMap[curr[0]-1][curr[1]] == cost-1:
				while costMap[curr[0]-1][curr[1]] == cost-1:
					curr = [curr[0]-1, curr[1]]
					cost = costMap[curr[0]][curr[1]]
				points.append(curr)

			elif costMap[curr[0]][curr[1]+1] == cost-1:
				while costMap[curr[0]][curr[1]+1] == cost-1:
					curr = [curr[0], curr[1]+1]
					cost = costMap[curr[0]][curr[1]]
				points.append(curr)

			elif costMap[curr[0]][curr[1]-1] == cost-1:
				while costMap[curr[0]][curr[1]-1] == cost-1:
					curr = [curr[0], curr[1]-1]
					cost = costMap[curr[0]][curr[1]]
				points.append(curr)

		return points

