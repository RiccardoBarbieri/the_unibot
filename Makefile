.PHONY: launch test format format-online
launch:
	python3 ./bot/bot.py "launch"
test:
	clear
	python3 ./bot/bot.py "test"
format:
	clear
	autopep8 -i *.py
	autopep8 -i ./*/*.py
format-online:
	autopep8 -i *.py
	autopep8 -i ./*/*.py