# Translate the docs
translate_docs:
	mkdir -p i18n/zh-Hans/docusaurus-plugin-content-docs/current
	cp -r docs/** i18n/zh-Hans/docusaurus-plugin-content-docs/current

translate_blog:
	mkdir -p i18n/zh-Hans/docusaurus-plugin-content-blog
	cp -r blog/** i18n/zh-Hans/docusaurus-plugin-content-blog
