import os
from flaskext.mysql import MySQL
from werkzeug import check_password_hash

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

