This folder contains all styles used in alt1 apps. All skin related files are contained in a virtual folder called 'alt-currentskin'. Any request made in alt1 to this folder will be redirected to the folder of the selected skin (on runeapps.org).
The files called ".htaccess' is used on the server to redirect requests made without Alt1 to the virtual folder. This way apps displayed in a normal browser will show the default skin.

Inside your app you should reference to two stylesheets:
1.) nis.css 
2.) alt1-currentskin/skinstyle.css

The second file adds extra skin specific styles, such as recolors etc.

You can also find some template sprites in this folder