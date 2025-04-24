Introduction
============

This documentation is a reference for [Tweego](http://www.motoslave.net/tweego/), a free (gratis and libre) [command line interface](https://en.wikipedia.org/wiki/Command-line_interface) compiler for [Twine](http://twinery.org/) projects, written in [Go](http://golang.org/).

Why use Tweego? Tweego lets you write Twine projects using your favorite text editor, rather than the [Twine software](http://twinery.org/). You write passages in plain text files using the [Twee notation](https://www.motoslave.net/tweego/docs/#twee-notation) across as few or as many files as you choose, which can make working, and collaborating, on Twine projects faster and easier. When you're ready to publish or test, you simply compile all your project files into an `.html` file with Tweego.

**Tip:** This document is a single page, so you may use your browser's find-in-page functionality---`CTRL`+`F` or `F3`---to search for specific terms.

**Note:** If you believe that you've found a bug in Tweego, or simply wish to make a suggestion, you may do so by [creating a new issue](https://github.com/tmedwards/tweego/issues) at its [source code repository](https://github.com/tmedwards/tweego).

Getting Started
===============

Overview
--------

**Tip:** In practice, most settings will be handled either by story configuration or via the command line, so the only configuration step that's absolutely necessary to begin using Tweego is to enable it to find your story formats.

Tweego may be configured in a variety of ways---by environment variable, story configuration, and command line options.

The various methods for specifying configuration settings cascade in the following order:

1.  Program defaults.
2.  Environment variables.
3.  Story configuration. See the [`StoryData` passage](https://www.motoslave.net/tweego/docs/#special-passages-storydata) for more information.
4.  Command line. See [Usage](https://www.motoslave.net/tweego/docs/#usage) for more information.

Program Defaults
----------------

Input charset

The default character set is `utf-8`, failing over to `windows-1252` if the input files are not in UTF-8.

**Tip:** It is ***strongly recommended*** that you use UTF-8 for all of your text files.

Story format

The default story format (by ID) is `.sugarcube/sugarcube-2-37-3`.

Output file

The default output file is `-`, which is shorthand for [*standard output*](https://en.wikipedia.org/wiki/Standard_streams).

Starting passage

The default starting passage name is `Start`.

Environment Variables
---------------------

*TWEEGO_PATH*

Path(s) to search for story formats. The value should be a list of directories to search for story formats. You may specify one directory or several. The format is exactly the same as any other *path type* environment variable for your operating system.

**Tip:** Setting *TWEEGO_PATH* is only necessary if you intend to place your story formats outside of the directories normally searched by Tweego. See [Search Directories](https://www.motoslave.net/tweego/docs/#getting-started-story-formats-search-directories) for more information.

**Note:** To separate multiple directories within *path* variables, Unix/Unix-like operating systems use the colon (`:`), while Windows uses the semi-colon (`;`). Only relevant if you intend to specify multiple directories.

**Unix/Unix-like examples**

If you wanted Tweego to search `/usr/local/storyformats`, then you'd set `TWEEGO_PATH` to:

```
/usr/local/storyformats
```

If you wanted Tweego to search `/storyformats` and `/usr/local/storyformats`, then you'd set `TWEEGO_PATH` to:

```
/storyformats:/usr/local/storyformats
```

**Windows examples**

If you wanted Tweego to search `C:\\storyformats`, then you'd set `TWEEGO_PATH` to:

```
C:\storyformats
```

If you wanted Tweego to search `C:\storyformats` and `D:\storyformats`, then you'd set `TWEEGO_PATH` to:

```
C:\storyformats;D:\storyformats
```

Story Formats
-------------

**Note:** Throughout this document the terms `story format` and `format` are virtually always used to encompass both story and proofing formats.

Tweego should be compatible with *all* story formats---i.e., those written for Twine 2, Twine 1 ≥v1.4.0, and Twine 1 ≤v1.3.5.

Installing a story format can be as simple as moving its directory into one of the directories Tweego searches for story formats---see [Search Directories](https://www.motoslave.net/tweego/docs/#getting-started-story-formats-search-directories) for more information. Each installed story format, which includes separate versions of the same story format, should have its own *unique* directory within your story formats directory---i.e., if you have both SugarCube v2 and v1 installed, then they should each have their own separate directory; e.g., `.sugarcube/sugarcube-2-37-3` and `sugarcube-1`. Do not create additional sub-directories, combine directories, or rename a story format's files.

**Tip:** To ensure a story format has been installed correctly, use the list-formats command line option (`--list-formats`) to see if Tweego lists it as an available format.

**Warning:** Twine 2 story formats are, ostensibly, encoded as JSON-P. Unfortunately, some story formats deviate from proper JSON encoding and are thus broken. Tweego uses a strict JSON decoder and cannot decode such broken story formats for use. Should you receive a story format decoding error, all reports should go to the format's developer.

### Search Directories

When Tweego is run, it finds story formats to use by searching the following directories: *(in order)*

1.  The directories `storyformats` and `.storyformats` within its *program directory*---i.e., the directory where Tweego's binary file is located.
2.  The directories `storyformats` and `.storyformats` within the *user's home directory*---i.e., either the value of the *HOME* environment variable or the operating system specified home directory.
3.  The directories `storyformats` and `.storyformats` within the *current working directory*---i.e., the directory that you are executing Tweego from.
4.  The directories specified via the *TWEEGO_PATH* environment variable. See [Environment Variables](https://www.motoslave.net/tweego/docs/#getting-started-environment-variables) for more information.

**Note:** For legacy compatibility, the following directories are also checked during steps #1--3: `story-formats`, `storyFormats`, and `targets`. You are ***strongly encouraged*** to use one of the directory names listed above instead.

**Warning:** A story format's directory name is used as its ***unique*** ID within the story format list. As a consequence, if multiple story formats, from different search paths, have the same directory name, then only the last one found will be registered.

Usage
=====

Overview
--------

**Tip:** At any time you may pass the help option (`-h`, `--help`) to Tweego to show its built-in help.

Basic command line usage is as follows:

```
tweego [options] sources...

```

Where `[options]` are mostly optional configuration flags---see [Options](https://www.motoslave.net/tweego/docs/#usage-options)---and `sources` are the input sources which may consist of supported files and/or directories to recursively search for such files. Many types of files are supported as input sources---see [Supported Files](https://www.motoslave.net/tweego/docs/#usage-supported-files) for more information.

Options
-------

`-a`, `--archive-twine2`

Output Twine 2 archive, instead of compiled HTML.

`--archive-twine1`

Output Twine 1 archive, instead of compiled HTML.

`-c SET`, `--charset=SET`

Name of the input character set (default: `"utf-8"`, fallback: `"windows-1252"`). Necessary only if the input files are not in either UTF-8 or the fallback character set.

**Tip:** It is ***strongly recommended*** that you use UTF-8 for all of your text files.

`-d`, `--decompile-twee3`

Output Twee 3 source code, instead of compiled HTML. See [Twee v3 Notation](https://www.motoslave.net/tweego/docs/#twee-notation-tweev3) for more information.

`--decompile-twee1`

Output Twee 1 source code, instead of compiled HTML. See [Twee v1 Notation](https://www.motoslave.net/tweego/docs/#twee-notation-tweev1) for more information.

**Note:** Except in instances where you plan to interoperate with Twine 1, it is ***strongly recommended*** that you decompile to Twee v3 notation rather than Twee v1.

`-f NAME`, `--format=NAME`

ID of the story format (default: `".sugarcube/sugarcube-2-37-3"`).

`-h`, `--help`

Print the built-in help, then exit.

`--head=FILE`

Name of the file whose contents will be appended as-is to the <head> element of the compiled HTML.

`--list-charsets`

List the supported input character sets, then exit.

`--list-formats`

List the available story formats, then exit.

`--log-files`

Log the processed input files.

**Note:** Unsupported when watch mode (`-w`, `--watch`) is enabled.

`-l`, `--log-stats`

Log various story statistics. Primarily, passage and word counts.

**Note:** Unsupported when watch mode (`-w`, `--watch`) is enabled.

`-m SRC`, `--module=SRC`

Module sources (repeatable); may consist of supported files and/or directories to recursively search for such files. Each file will be wrapped within the appropriate markup and bundled into the <head> element of the compiled HTML. Supported files: `.css`, `.js`, `.otf`, `.ttf`, `.woff`, `.woff2`.

`--no-trim`

Do not trim whitespace surrounding passages---i.e., whitespace preceding and trailing the actual text of the passage. By default, such whitespace is removed when processing passages.

**Note:** It is recommended that you do not disable passage trimming.

`-o FILE`, `--output=FILE`

Name of the output file (default: `-`; i.e., [*standard output*](https://en.wikipedia.org/wiki/Standard_streams)).

`-s NAME`, `--start=NAME`

Name of the starting passage (default: the passage set by the story data, elsewise `"Start"`).

`-t`, `--test`

Compile in test mode; only for story formats in the Twine 2 style.

`--twee2-compat`

Enable Twee2 source compatibility mode; files with the `.tw2` or `.twee2` extensions automatically have compatibility mode enabled.

`-v`, `--version`

Print version information, then exit.

`-w`, `--watch`

Start watch mode; watch input sources for changes, rebuilding the output as necessary.

Supported Files
---------------

Tweego supports various types of files for use in projects. File types are recognized by filename extension, so all files ***must*** have an extension.

The following extensions are supported:

`.tw`, `.twee`

Twee notation source files to process for passages.

**Note:** If any of these files are in the unofficial Twee2 notation, you must manually enable the Twee2 compatibility mode via its command line option (`--twee2-compat`).

`.tw2`, `.twee2`

Unofficial Twee2 notation source files to process for passages. Twee2 compatibility mode is automatically enabled for files with these extensions.

`.htm`, `.html`

HTML source files to process for passages, either compiled files or story archives.

`.css`

CSS source files to bundle.

`.js`

JavaScript source files to bundle.

`.otf`, `.ttf`, `.woff`, `.woff2`

Font files to bundle, as `@font-face` style rules. The generated name of the font family will be the font's base filename sans its extension---e.g., the family name for `chinacat.tff` will be `chinacat`.

`.gif`, `.jpeg`, `.jpg`, `.png`, `.svg`, `.tif`, `.tiff`, `.webp`

Image files to bundle, as image passages. The generated name of the image passage will be the base filename sans its extension---e.g., the passage name for `rainboom.jpg` will be `rainboom`.

**Note:** As of this writing, image passages are only natively supported by SugarCube (all versions) and the Twine 1 ≥v1.4 vanilla story formats.

`.aac`, `.flac`, `.m4a`, `.mp3`, `.oga`, `.ogg`, `.opus`, `.wav`, `.wave`, `.weba`

Audio files to bundle, as audio passages. The generated name of the audio passage will be the base filename sans its extension---e.g., the passage name for `swamped.mp3` will be `swamped`.

**Note:** As of this writing, audio passages are only natively supported by SugarCube ≥v2.24.0.

`.mp4`, `.ogv`, `.webm`

Video files to bundle, as video passages. The generated name of the video passage will be the base filename sans its extension---e.g., the passage name for `cutscene.mp4` will be `cutscene`.

**Note:** As of this writing, video passages are only natively supported by SugarCube ≥v2.24.0.

`.vtt`

Text track files to bundle, as text track passages. The generated name of the text track passage will be the base filename sans its extension---e.g., the passage name for `captions.vtt` will be `captions`.

**Note:** As of this writing, text track passages are only natively supported by SugarCube ≥v2.24.0.

File & Directory Handling
-------------------------

Tweego allows you to specify an arbitrary number of files and directories on the command line for processing. In addition to those manually specified, it will recursively search all directories encountered looking for additional files and directories to process. Generally, this means that you only have to specify the base source directory of your project and Tweego will find all of its files automatically.

Basic Examples
--------------

Compile `example_1.twee` as `example_1.html` with the default story format:

```
tweego -o example_1.html example_1.twee

```

Compile all files in `example_directory_2` as `example_2.html` with the default story format:

```
tweego -o example_2.html example_directory_2

```

Compile `example_3.twee` as `example_3.html` with the story format `snowman`:

```
tweego -f snowman -o example_3.html example_3.twee

```

Compile all files in `example_directory_4` as `example_4.html` with the default story format while also bundling all files in `modules_directory_4` into the <head> element of the compiled HTML:

```
tweego -o example_4.html -m modules_directory_4 example_directory_4

```

Decompile `example_5.html` as `example_5.twee`:

```
tweego -d -o example5.twee example5.html

```

Twee Notation
=============

In Twee and Twine, stories are arranged into units called passages. Each passage has a name, optional attributes, and content.

There are two official Twee notations, Twee v3 and Twee v1, and an unofficial Twee2 notation.

-   Twee v3 is the current official notation---see the [twee-3-specification.md](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) for more information.
-   Twee v1 is the classic/legacy official notation, which is a compatible subset of Twee v3.
-   The unofficial Twee2 notation is primarily generated and used by the Twee2 compiler, which is largely abandonware.

By default, Tweego supports compiling from both of the official Twee notations and decompiling to Twee v3. Compiling from the unofficial Twee2 notation is also supported via a compatibility mode, but is not enabled by default. To load files with the Twee2 compatibility mode enabled, either the files must have a Twee2 extension (`.tw2`, `.twee2`) or its command line option (`--twee2-compat`) must be used.

**Warning:** It is ***strongly recommended*** that you do not enable Twee2 compatibility mode unless you absolutely need it.

Twee v3 Notation
----------------

In the Twee v3 notation, passages consist of a passage declaration and a following content section.

A passage declaration must be a single line and is composed of the following components *(in order)*:

1.  A required start token that must begin the line. It is composed of a double colon (`::`).
2.  A required passage name.
3.  An optional tags block that must directly follow the passage name. It is composed of a left square bracket (`[`), a space separated list of tags, and a right square bracket (`]`).
4.  An optional metadata block that must directly follow either the tag block or, if the tag block is omitted, the passage name. It is composed of an inline JSON chunk containing the optional properties `position` and `size`.

The passage content section begins with the very next line and continues until the next passage declaration.

**Tip:** For the sake of readability, it is recommended that each component within the passage declaration after the start token be preceded by one or more spaces and that, at least, one blank line is added between passages.

**Note:** You will likely never need to create metadata blocks yourself. When compiling, any missing metadata will be automatically generated for the compiled file. When decompiling, they'll be automatically pulled from the compiled file.

### Passage And Tag Name Escaping

To prevent ambiguity during parsing, passage and tag names that include the optional tag or metadata block delimiters (`[`, `]`, `{`, `}`) must escape them. The escapement mechanism is to prefix the escaped characters with a backslash (`\`). Further, to avoid ambiguity with the escape character itself, non-escape backslashes must also be escaped via the same mechanism---e.g., `foo\bar` should be escaped as `foo\\bar`.

**Tip:** It is ***strongly recommended*** that you simply avoid needing to escape characters by not using the optional tag or metadata block delimiters within passage and tag names.

**Tip:** For different reasons, it is also ***strongly recommended*** that you avoid the use of the link markup separator delimiters (`|`, `->`, `<-`) within passage and tag names.

### Example

#### Without any passage metadata

Exactly the same as Twee v1, save for the [Passage And Tag Name Escaping](https://www.motoslave.net/tweego/docs/#twee-notation-tweev3-passage-and-tag-name-escaping) rules.

```
:: A passage with no tags
Content of the "A passage with no tags" passage.

:: A tagged passage with three tags [alfa bravo charlie]
Content of the "A tagged passage with three tags" passage.
The three tags are: alfa, bravo, charlie.

```

#### With some passage metadata

Mostly likely to come from decompiling Twine 2 or Twine 1 compiled HTML files.

```
:: A passage with no tags {"position":"860,401"}
Content of the "A passage with no tags" passage.

:: A tagged passage with three tags [alfa bravo charlie] {"position":"860,530"}
Content of the "A tagged passage with three tags" passage.
The three tags are: alfa, bravo, charlie.

```

Twee v1 Notation
----------------

**Warning:** Except in instances where you plan to interoperate with Twine 1, it is ***strongly recommended*** that you do not create new files using the Twee v1 notation. You should prefer the [Twee v3 notation](https://www.motoslave.net/tweego/docs/#twee-notation-tweev3) instead.

Twee v1 notation is a subset of Twee v3 that lacks support for both the optional metadata block within passage declarations and passage and tag name escaping.

### Example

```
:: A passage with no tags
Content of the "A passage with no tags" passage.

:: A tagged passage with three tags [alfa bravo charlie]
Content of the "A tagged passage with three tags" passage.
The three tags are: alfa, bravo, charlie.

```

Twee2 Notation
--------------

**Warning:** It is ***strongly recommended*** that you do not create new files using the unofficial Twee2 notation. You should prefer the [Twee v3 notation](https://www.motoslave.net/tweego/docs/#twee-notation-tweev3) instead.

The unofficial Twee2 notation is mostly identical to the Twee v1 notation, save that the passage declaration may also include an optional position block that must directly follow either the tag block or, if the tag block is omitted, the passage name.

### Example

```
:: A passage with no tags <860,401>
Content of the "A passage with no tags" passage.

:: A tagged passage with three tags [alfa bravo charlie] <860,530>
Content of the "A tagged passage with three tags" passage.
The three tags are: alfa, bravo, charlie.

```

Special Passages & Tags
=======================

Passages and tags that have special meaning to Tweego.

**Note:** This is *not* a exhaustive list of all special passages and tags that may have meaning to story formats---or other compilers. See the documentation of the specific story format---or compiler---for their list of special passages and tags.

**Warning:** The names of all special passages and tags listed herein are case sensitive, thus must be spelled *exactly* as shown.

Special Passages
----------------

### `Start`

The `Start` passage will, by default, be used as the starting passage---i.e., the first normal passage displayed to the player. That behavior may be overridden via either the *start* property from the [`StoryData` passage](https://www.motoslave.net/tweego/docs/#special-passages-storydata) or the start command line option (`-s NAME`, `--start=NAME`).

**Tip:** It is ***strongly recommended*** that you simply use the default starting name, `Start`, when beginning new projects.

### `StoryData`

The `StoryData` passage may be used to specify basic project settings. Its contents must consist of a JSON chunk, which is, generally, pretty-printed---i.e., line-broken and indented.

The core properties used with all story formats include:

-   *ifid*: (string) Required. The project's Interactive Fiction IDentifier (IFID), which is a unique code used to identify your project---similar to the ISBN code assigned to a book. If the project does not already have an IFID, you may omit the property and Tweego will automatically generate one for you with instructions on how to copy it into the chunk.
-   *start*: (string) Optional. The name of the starting passage. If omitted, defaults to the [`Start` passage](https://www.motoslave.net/tweego/docs/#special-passages-start).

The properties used only with Twine 2-style story formats include:

-   *format*: (string) Optional. The name of the story format to compile against---e.g., `SugarCube`, `Harlowe`, `Chapbook`, `Snowman`.
-   *format-version*: (string) Optional. The version of the story format to compile against. Story format versions follow the [Semantic Versioning specification](https://semver.org/), though generally use only the *major.minor.patch* form---e.g., `2.30.0`. From the installed story formats matching the name specified in *format*, Tweego will attempt to use the greatest version that matches the specified *major* version---i.e., if *format-version* is `2.0.0` and you have the versions `1.0.0`, `2.0.0`, `2.5.0`, and `3.0.0` installed, then Tweego will choose `2.5.0`.

**Note:** The above is *not* an exhaustive list of all Twine 2-style story format properties. There are others available that are only useful when actually interoperating with Twine 2---e.g, *tag-colors* and *zoom*. See the [twee-3-specification.md](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) for more information.

**Tip:** To compile against a specific version of a story format, use the format command line option (`-f NAME`, `--format=NAME`) to specify the version by its ID. If you don't know the ID, use the list-formats command line option (`--list-formats`) to find it.

**Warning:** JSON chunks are not JavaScript object literals, though they look much alike. Property names must always be double quoted and you must not include a trailing comma after the last property.

#### Example

```
:: StoryData
{
	"ifid": "D674C58C-DEFA-4F70-B7A2-27742230C0FC",
	"format": "SugarCube",
	"format-version": "2.30.0",
	"start": "My Starting Passage"
}

```

### `StoryTitle`

The contents of the `StoryTitle` passage will be used as the name/title of the story.

Special Tags
------------

### `script`

The `script` tag denotes that the passage's contents are JavaScript code.

**Note:** In general, Tweego makes creating script passages unnecessary as it will automatically bundle any JavaScript source files (`.js`) it encounters into your project.

### `stylesheet`

The `stylesheet` tag denotes that the passage's contents are CSS rules.

**Note:** In general, Tweego makes creating stylesheet passages unnecessary as it will automatically bundle any CSS source files (`.css`) it encounters into your project.

FAQ & Tips
==========

This is a collection of tips, from how to avoid pitfalls to best practices.

**Note:** Suggestions for new entries may be submitted by [creating a new issue](https://github.com/tmedwards/tweego/issues) at Tweego's [source code repository](https://github.com/tmedwards/tweego)---though acceptance of submissions ***is not*** guaranteed.

Avoid processing files
----------------------

The way to avoid having Tweego process files is to not pass it the files in the first place---i.e., keep the files in question separate from the files you want Tweego to compile.

Using image files as an example, I would generally recommend a directory structure something like:

```
project_directory/
	images/
	src/

```

Where `src` is the directory you pass to Tweego, which only contains files you want it to compile---and possibly files that it will not process, like notes and whatnot. For example, while within the project directory the command:

```
tweego -o project.html src

```

Will only compile the files in `src`, leaving the image files in `images` alone.

Convert Twee2 files to Twee v3
------------------------------

You may convert a Twee2 notation file to a Twee v3 notation file like so:

```
tweego -d -o twee_v3_file.twee twee2_file.tw2

```

Or, if the Twee2 notation file has a standard Twee file extension (`.tw`, `.twee`), like so:

```
tweego --twee2-compat -d -o twee_v3_file.twee twee2_file.twee

```