import os
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash

# Class to manage all interactions with the database
class DatabaseController():

    instance = None

    def __init__(self, app):
        mysql = MySQL(app=app, host='localhost', user=os.environ['db_user'], password=os.environ['db_passwd'], db='keenanknights')
        self.connection = mysql.connect()
        DatabaseController.instance = self

    @classmethod
    def get_instance(cls):
        return cls.instance

    # Function to authenticate a user in the database
    def authenticateUser(self, username, password):
        with self.connection.cursor() as cursor:
            sql = "select password from users where netid = %s"
            cursor.execute(sql, username)
            result = cursor.fetchone()

            if not result:
                return False

            return check_password_hash(result[0], password)

    # Function to change the password for a user in the database
    # Returns True on success, False on error
    def changePassword(self, username, old_password, new_password):
        if self.authenticateUser(username, old_password):
            new_hash = generate_password_hash(new_password)

            with self.connection.cursor() as cursor:
                sql = "update users set password = %s where netid = %s"
                cursor.execute(sql, (new_hash, username))
                self.connection.commit()
            return True
        
        return False

    def insert_resident_data(self, ice_data):
        with self.connection.cursor() as cursor:
            print("inserting into users table...")
            # inserting into users table
            sql = "insert into users values ( %s, %s, %s, %s, %s, %s, %s, %s, %s )"
            cursor.execute(sql, (ice_data['netid'], ice_data['ndid'], ice_data['first_name'], ice_data['last_name'], int(ice_data['dorm']), ice_data['room'], ice_data['email'], 'pass',1))

            print("inserting basic info...")
            # insert basic info(addr, name)
            sql = "insert into residents values ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (ice_data['netid'], ice_data['street_addr'], ice_data['city'], ice_data['state'], ice_data['country'], ice_data['zip'], ice_data['birthday'], ice_data['class_level'], ice_data['religion'], ice_data['phone_num'], ice_data['insurance']))

            print("inserting major info...")
            # insert major information
            sql = "insert into enrolled_in values (%s, %s)"
            cursor.execute(sql, (ice_data['ndid'], ice_data['major']))

            print("inserting mommy info...")
            # Insert mommy data
            sql = "insert into parents values (%s, %s, %s)"
            cursor.execute(sql, (ice_data['mother_email'], ice_data['mother_emp'], ice_data['mother_name']))
            sql = "insert into guarded_by values (%s, %s)"
            cursor.execute(sql, (ice_data['ndid'], ice_data['mother_email']))

            print("inserting daddy info...")
            # insert daddy data
            sql = "insert into parents values (%s, %s, %s)"
            cursor.execute(sql, (ice_data['father_email'], ice_data['father_emp'], ice_data['father_name']))
            sql = "insert into guarded_by values (%s, %s)"
            cursor.execute(sql, (ice_data['ndid'], ice_data['father_email']))

            print("inserting emergency info...")
            sql = "insert into emergency_contact values (%s, %s, %s)"
            cursor.execute(sql, (ice_data['ec_phone'], ice_data['ec_relation'], ice_data['ec_name']))

            sql = "insert into ec_of values(%s, %s)"
            cursor.execute(sql, (ice_data['ndid'], ice_data['ec_phone']))

        self.connection.commit()

    def update_resident_data(self, ice_data):
        with self.connection.cursor() as cursor:
            print("updating users table...")
            # inserting into users table
            sql = "update users set netid=%s, ndid=%s, first_name=%s, last_name=%s, dorm=%s, room_num=%s, email=%s where netid=%s"
            cursor.execute(sql, (ice_data['netid'], ice_data['ndid'], ice_data['first_name'], ice_data['last_name'], int(ice_data['dorm']), ice_data['room'], ice_data['email'], ice_data['netid']))

            print("inserting basic info...")
            # update basic info(addr, name)
            sql = "update residents set netid=%s, street_address=%s, city=%s, state=%s, country=%s, zip_code=%s, birthday=%s, class_level=%s, religion=%s, phone_number=%s, insurance=%s"
            cursor.execute(sql, (ice_data['netid'], ice_data['street_addr'], ice_data['city'], ice_data['state'], ice_data['country'], ice_data['zip'], ice_data['birthday'], ice_data['class_level'], ice_data['religion'], ice_data['phone_num'], ice_data['insurance']))

            print("updating major info...")
            # update major information
            sql = "update enrolled_in set ndid=%s, major=%s where ndid=%s"
            cursor.execute(sql, (ice_data['ndid'], ice_data['major'], ice_data['ndid']))

            print("updating parent info...")

            # update parent data
            sql = "delete from parents where email in (select email from guarded_by where ndid = %s)"
            cursor.execute(sql, ice_data['ndid'])

            sql = "insert into parents values (%s, %s, %s)"
            cursor.execute(sql, (ice_data['mother_email'], ice_data['mother_emp'], ice_data['mother_name']))     
            sql = "insert into parents values (%s, %s, %s)"
            cursor.execute(sql, (ice_data['father_email'], ice_data['father_emp'], ice_data['father_name']))            

            sql = "update guarded_by set ndid=%s, parent_email=%s where ndid=%s"
            cursor.execute(sql, (ice_data['ndid'], ice_data['mother_email'], ice_data['ndid']))

            print("updating emergency info...")
            #update emergency contact information
            sql = "delete from emergency_contact where phone_number in (select ec_phone from ec_of where ndid=%s)"
            cursor.execute(sql, (ice_data['ndid']))

            sql = "insert into emergency_contact values (%s, %s, %s)"
            cursor.execute(sql, (ice_data['ec_phone'], ice_data['ec_relation'], ice_data['ec_name']))

            sql = "update ec_of set ndid=%s, ec_phone=%s where ndid=%s"
            cursor.execute(sql, (ice_data['ndid'], ice_data['ec_phone'], ice_data['ndid']))

        self.connection.commit()

    def delete_account(self, ndid):
        with self.connection.cursor() as cursor:

            print("deleting from users table...")
            # delete from users table
            sql = "delete from users where ndid=%s"
            cursor.execute(sql, ndid)

            print("deleting from enrolled_in...")
            # delete from enrolled_in table
            sql = "delete from enrolled_in where ndid=%s"
            cursor.execute(sql, ndid)

            print("deleting parents info...")
            # delete mother from parents table
            sql = "delete from parents where email in (select parent_email from guarded_by where ndid=%s)"
            cursor.execute(sql, ndid)

            print("deleting emergency contact info...")
            # delete ec info from emergency_contact table
            sql = "delete from emergency_contact where phone_number in (select ec_phone from ec_of where ndid=%s)"
            cursor.execute(sql, ndid)

        self.connection.commit()

    def get_residents(self):
        with self.connection.cursor() as cursor:
            print("querying the db for users and netids")
            sql = "select first_name, last_name, netid from users"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result

    def get_resident_info(self, netid):
        user_data = {}
        with self.connection.cursor() as cursor:

            # Get users' information from the resident table
            sql = "select netid, street_address, city, state, country, zip_code, birthday, class_level, religion, phone_number, insurance from residents where netid=%s"
            cursor.execute(sql, netid)
            result = cursor.fetchone()
            user_data['netid'] = result[0]
            user_data['street_address'] = result[1]
            user_data['city'] = result[2]
            user_data['state'] = result[3]
            user_data['country'] = result[4]
            user_data['zip_code'] = result[5]
            user_data['birthday'] = result[6]
            user_data['class_level'] = result[7]
            user_data['religion'] = result[8]
            user_data['phone_number'] = result[9]
            user_data['insurance'] = result[10]

            # Get user's info from the user table
            sql = "select ndid, first_name, last_name, dorm, room_num, email from users where netid=%s"
            cursor.execute(sql, netid)
            result = cursor.fetchone()
            user_data['ndid'] = result[0]
            user_data['first_name'] = result[1]
            user_data['last_name'] = result[2]
            user_data['dorm'] = result[3]
            user_data['room_num'] = result[4]
            user_data['email'] = result[5]
            
            # get user's allergy info
            sql = "select allergies.allergy_name, allergies.severity from is_allergic_to, allergies where is_allergic_to.ndid=%s and allergies.name=is_allergic_to.allergy_name"
            cursor.execute(sql, user_data['ndid'])
            result = cursor.fetchall()
            allergies = []
            for alerg in result:
                allergies.append(alerg[0])
            user_data['allergies'] = allergies

            # get user's common conditions
            sql = "select asthma, heart_disorder, seizures, diabetes, hypoglycemia, bleeding_tendencies from common_conditions where ndid=%s"
            cursor.execute(sql, user_data['ndid'])
            result = cursor.fetchone()
            user_data['asthma'] = result[0]
            user_data['heart_disorder'] = result[1]
            user_data['seizures'] = result[2]
            user_data['diabetes'] = result[3]
            user_data['hypoglycemia']= result[4]
            user_data['bleeding_tendencies'] = result[5]

            #get dorm info
            sql = "select name from dorms where id=%s"
            cursor.execute()
            result = cursor.fetchone()
            user_data['dorm'] = result[0]

            # get emergency contacts for user
            sql = "select E.phone_number, E.relation, E.name from ec_of, emergency_contact E where ec_of.ndid=%s and E.phone_number=ec_of.ec_phone"
            cursor.execute(sql, user_data['ndid'])
            result = cursor.fetchall()
            emcon = []
            for ec in result:
                emcon.append({"name": ec[2], "relation": ec[1], "phone": ec[0]})
            user_data['emergency_contacts'] = emcon

            # major and college information
            sql = "select E.major, E.college from enrolled_in, education E where enrolled_in.ndid=%s and enrolled_in.major=E.major"
            cursor.execute(sql, user_data['ndid'])
            result = cursor.fetchone()
            user_data['major'] = result[0]
            user_data['college'] = result[1]

            # parents and guardians information + siblings
            sql = "select P.email, P.employer, P.name from parents P, guarded_by where guarded_by.ndid=%s and parents.email=guarded_by.parent_email"
            cursor.execute(sql, user_data['ndid']
            result = cursor.fetchall()
            parents = []
            for par in result:
                parents.append({"email": par[0], "name": par[2], "employer" : par[1]})
            user_data['parents'] = parents

            sql = "select S.name, S.age, S.type from sibling_of, siblings S where sibling_of.ndid=%s and S.name=sibling_of.sibling_name"
            cursor.execute(sql, user_data['ndid'])
            result = cursor.fetchall()
            sibs = []
            for sib in result:
                sibs.append({"name": sib[0], "age":sib[1], "type":sib[2]})
            user_data['siblings'] = sibs
            
            sql = "select C.name, C.description from has_condition, present_condition C where has_condition.ndid=%s and has_condition.condition_name=C.name"
            cursor.execute(sql, user_data['ndid']
            result = cursor.fetchall()
            conds = []
            for pc in result:
                conds.append({"name": pc[0], "desc":pc[1]})
            user_data['present_conditions'] = conds
            
            sql = "select M.med_name from takes M where M.ndid=%s"
            cursor.execute(sql, user_data['ndid'])
            result = cursor.fecthall()
            user_data['medications'] = result

            return user_data

            
