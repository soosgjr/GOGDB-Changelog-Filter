# GOGDB Changelog Filter

A Chrome extension that filters out the games you don't own a license for from
GOGDB's changelog.


## Installation

The easiest method of installing the extension is by loading it unpacked. This
can be achieved by following these steps:

  1. Download the source as a ZIP and unzip it.
  2. Open Chrome's extensions page.

     ![](Documentation/extensions.png?raw=true)

  3. Turn on developer mode.

     ![](Documentation/developer-mode.png?raw=true)

  4. Load the `Source` folder as an unpacked extension.

     ![](Documentation/load-unpacked.png?raw=true)

  5. Whenever you restart the browser it'll warn you of the dangers of running
     extensions in developer mode. You'll have to dismiss this warning to
     continue using the extension. There's a method of working around this
     issue, but it requires editing local policies, which is outside the scope
     of this tutorial.


## Usage

Once the extension is installed you'll still need to load your licenses and
enable the filtering. The license loading can be done by pressing the update
button on the extension's options page.

![](Documentation/options.png?raw=true)

![](Documentation/load-licenses.png?raw=true)

Please note that the extension doesn't automatically update its list of
licenses. You'll have to repeat this step every time you purchase something new.

The only thing left to be done is enabling the filtering by clicking the
extension's icon next to the URL bar, which should change its faded logo to an
opaque one.

![](Documentation/filtering.png?raw=true)

Now if you visit GOGDB's [changelog page](https://www.gogdb.org/changelog) only
the games you own a license for should show up. If you want to see the complete
list, filtering can be disabled by pressing the extension icon again and
reloading the page.


## Version History

- Version 0.1.0, May 17th, 2020
  - The initial release.
