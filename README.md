Simon
=====

- The Simon object constructor has an argument for max number of turns before a considered win. I would set it to 99, but it is currently at 20 for demo purposes.

- Saves high score to localStorage. Please note that IE/Edge does not allow local use of localStorage, but viewing the CodePen link in IE/Edge will work.

- The main four tones alternate between two audio tags with the same sound effect. This helps to prevent audio popping from rapid double-clicking. Rapid triple-clicking can still cause minor audio distortion, but a regular player would probably not encounter it.

- Includes Gulp build scripts.

Unminified CodePen version: http://codepen.io/Meepasaurus/full/ORLPBz/
----------------------------------------------------------------------

Audio Credits
-------------

- Main four tones edited from freecodecamp.

- Miss effect created with Bfxr. http://www.bfxr.net/

- Success clip that no one will probably ever hear from https://www.freesound.org/people/jbeetle/sounds/274510/
