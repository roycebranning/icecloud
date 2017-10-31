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
