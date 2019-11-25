TARGETS = fr en
JSON = fr.json en.json

all: $(TARGETS)

fr:
	mustache fr.json template.mustache > www/index.html

en:
	mustache en.json template.mustache > www/en.html

clean:
	rm -f www/index.html
	rm -f www/en.html

mrproper: clean
