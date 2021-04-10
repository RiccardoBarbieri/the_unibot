from __future__ import annotations
import sys
import getpass
if getpass.getuser() == 'ricca':
    sys.path.append('C:\\Users\\ricca\\Desktop\\telegram')
elif getpass.getuser() == 'grufoony':
    sys.path.append('/home/grufoony/bot-telegram')
elif getpass.getuser() == 'riccardoob':
    sys.path.append('/home/riccardoob/telegram_bot')
elif getpass.getuser() == 'pi':
    sys.path.append('/home/pi/telegram-bot')


from enum import Enum

class TypesEnum(Enum):
    """
    Enumerative object that contains all the possible types
    MySQL can offer. All the enumeratives are associated with
    a string that represents them in MySQL.

    Attributes
    ----------
    Numeric types:
        TINYINT\n
        SMALLINT\n
        MEDIUMINT\n
        INT\n
        BIGINT\n
        DECIMAL\n
        FLOAT\n
        DOUBLE\n
        BIT\n
    String types:
        CHAR\n
        VARCHAR\n
        BINARY\n
        VARBINARY\n
        TINYBLOB\n
        BLOB\n
        MEDIUMBLOB\n
        LONGBLOB\n
        TINYTEXT\n
        TEXT\n
        MEDIUMTEXT\n
        LONGTEXT\n
        ENUM\n
        SET\n
    Date and time types
        DATE\n
        TIME\n
        DATETIME\n
        TIMESTAMP\n
        YEAR\n
    Spatial data types
        GEOMETRY\n
        POINT\n
        LINESTRING\n
        POLYGON\n
        GEOMETRYCOLLECTION\n
        MULTILINESTRING\n
        MULTIPOINT\n
        MULTIPOLYGON\n
    """
    
    # Numeric types
    TINYINT	= 'TINYINT' # A very small integer
    SMALLINT = 'SMALLINT' # A small integer
    MEDIUMINT = 'MEDIUMINT' # A medium-sized integer
    INT	= 'INT' # A standard integer
    BIGINT = 'BIGINT' # A large integer
    DECIMAL = 'DECIMAL'	# A fixed-point number
    FLOAT = 'FLOAT' # A single-precision floating point number
    DOUBLE = 'DOUBLE' # A double-precision floating point number
    BIT = 'BIT' # A bit field

    # String types
    CHAR = 'CHAR' # A fixed-length nonbinary (character) string
    VARCHAR = 'VARCHAR'	# A variable-length non-binary string
    BINARY = 'BINARY' # A fixed-length binary string
    VARBINARY = 'VARBINARY' # A variable-length binary string
    TINYBLOB = 'TINYBLOB' # A very small BLOB (binary large object)
    BLOB = 'BLOB' # A small BLOB
    MEDIUMBLOB = 'MEDIUMBLOB' # A medium-sized BLOB
    LONGBLOB = 'LONGBLOB' # A large BLOB
    TINYTEXT = 'TINYTEXT' # A very small non-binary string
    TEXT = 'TEXT' # A small non-binary string
    MEDIUMTEXT = 'MEDIUMTEXT' # A medium-sized non-binary string
    LONGTEXT = 'LONGTEXT' # A large non-binary string
    ENUM = 'ENUM' # An enumeration; each column value may be assigned one enumeration member
    SET = 'SET' # A set; each column value may be assigned zero or more SET members

    # Date and time types
    DATE = 'DATE' # A date value in CCYY-MM-DD format
    TIME = 'TIME' # A time value in hh:mm:ss format
    DATETIME = 'DATETIME' # A date and time value inCCYY-MM-DD hh:mm:ssformat
    TIMESTAMP = 'TIMESTAMP' # A timestamp value in CCYY-MM-DD hh:mm:ss format
    YEAR = 'YEAR' # A year value in CCYY or YY format

    # Spatial data types
    GEOMETRY = 'GEOMETRY' # A spatial value of any type
    POINT = 'POINT' # A point (a pair of X-Y coordinates)
    LINESTRING = 'LINESTRING' # A curve (one or more POINT values)
    POLYGON = 'POLYGON' # A polygon
    GEOMETRYCOLLECTION = 'GEOMETRYCOLLECTION' # A collection of GEOMETRY values
    MULTILINESTRING = 'MULTILINESTRING'	# A collection of LINESTRING Values
    MULTIPOINT = 'MULTIPOINT' # A collection of POINTvalues
    MULTIPOLYGON = 'MULTIPOLYGON' # A collection of POLYGONvalues

    

