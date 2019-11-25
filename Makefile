TARGETS = fr en
JSON = fr.json en.json

all: $(TARGETS)

fr:
	mustache fr.json template.mustache > docs/index.html

en:
	mustache en.json template.mustache > docs/en.html

clean:
	rm -f www/index.html
	rm -f www/en.html

mrproper: clean
