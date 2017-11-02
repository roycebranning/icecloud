import os
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash

# Class to manage all interactions with the database
class DatabaseController():
    def __init__(self, app):
        mysql = MySQL(app=app, host='localhost', user=os.environ['db_user'], password=os.environ['db_passwd'], db='keenanknights')
        self.connection = mysql.connect()

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

            return True
        
        return False

    def insert_resident_data(self, ice_data):
        with self.connection.cursor() as cursor:
            sql = "insert into users values ( %s, %s, %s, %s, %s, %s, %s, %s, %d )"
            cursor.execute(sql, ice_data['netid'], ice_data['ndid'], ice_data['first_name'], ice_data['last_name'], ice_data['dorm'], ice_data['room'], ice_data['email'], ice_data['password'],1)

            # insert basic info(addr, name)
            sql = "insert into residents values ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, ice_data['netid'], ice_data['street_addr'], ice_data['city'], ice_data['state'], ice_data['country'], ice_data['zip'], ice_data['birthday'], ice_data['class_level'], ice_data['religion'], ice_data['phone_num'], ice_data['insurance'])

            # insert major information
            sql = "insert into enrolled_in values (%s, %s)"
            cursor.execute(sql, ice_data['ndid'], ice_data['major'])

            # Insert mommy data
            sql = "insert into parents values (%s, %s, %s)"
            cursor.execute(sql, ice_data['mother_email'], ice_data['mother_emp'], ice_data['mother_name'])

            # insert daddy data
            sql = "insert into parents values (%s, %s, %s)"
            cursor.execute(sql, ice_data['father_email'], ice_data['father_emp'], ice_data['father_name'])

            sql = "insert into guarded_by values (%s, %s)"
            cursor.execute(sql ice_data['ndid'], ice_data['mother_email'])

            sql = "insert into guarded_by values (%s, %s)"
            cursor.execute(sql ice_data['ndid'], ice_data['father_email'])

            sql = "insert into emergency_contact values (%s, %s, %s)"
            cursor.execute(sql, ice_data['ec_phone'], ice_data['ec_relation'], ice_data['ec_name'])

            sql = "insert into ec_of values(%s, %s)"
            cursor.execute(sql, ice_data['ndid'], ice_data['ec_phone'])

            




