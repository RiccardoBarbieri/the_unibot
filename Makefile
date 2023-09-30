.PHONY: launch test format
launch:
	python3 ./bot/bot.py "launch"
test:
	clear
	python3 ./bot/bot.py "test"
format:
	clear
	autopep8 -i *.py
	autopep8 -i ./*/*.py