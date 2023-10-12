.PHONY: launch test format format-online
launch:
	python3 ./bot/bot.py "launch"
test:
	clear
	python3 ./bot/bot.py "test"
format:
	clear
	python3 -m black *.py
	python3 -m black ./*/*.py
format-online:
	python3 -m black *.py
	python3 -m black ./*/*.py