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
            sql = "update users set netid=%s, ndid=%s, first_name=%s, last_name=%s, dorm=%s, room_num=%s, email=%s, password=%s where ndid=%s"
            cursor.execute(sql, (ice_data['netid'], ice_data['ndid'], ice_data['first_name'], ice_data['last_name'], int(ice_data['dorm']), ice_data['room'], ice_data['email'], ice_data['password'], ice_data['ndid']))

            #print("inserting basic info...")
            # update basic info(addr, name)
            #sql = "update into residents values ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            #cursor.execute(sql, (ice_data['netid'], ice_data['street_addr'], ice_data['city'], ice_data['state'], ice_data['country'], ice_data['zip'], ice_data['birthday'], ice_data['class_level'], ice_data['religion'], ice_data['phone_num'], ice_data['insurance']))

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


