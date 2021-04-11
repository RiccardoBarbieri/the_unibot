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

class class1():
    
    def __init__(self, valore: int):
        self.val = valore
    
    def __ge__(self, o: object):
        
    
class class2():
    
    def __init__(self) -> None:
        self.asd = '123'
    
    def __ge__(self, o: object):
        if o.val == int(o.val):
            return class1(124)
        
def func(class1: class1):
    print(class1.val)

c = class1(123)
cc = class2()

func(cc >= c)