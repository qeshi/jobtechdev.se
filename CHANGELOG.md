# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
None


## [1.1.3] - 2019

### Fixed
- nginx points 404 to /404.html
- Swedish cookie popup
- Swedish API status
- Minor cleaning of content

## [1.1.2] - 2019-07-15 

### Fixed
- Seperated Analytics and Tag Mangager accounts.
- Fixed Content Security spec to support font, analytics and tag manager.  

## [1.1.1] - 2019-07-15 

### Fixed
- Added Google Tag Manager script and tag

## [1.1.0] - 2019-07-08

### Fixed
- Mydata github links pointed to old repo fixed (https://github.com/MagnumOpuses/jobtechdev.se/pull/59)
- Broken link to AF Jobs Swagger UI (https://github.com/MagnumOpuses/jobtechdev.se/pull/56)
- Weights on most pages to avoid page order ambiguity in left-hand menu (https://github.com/MagnumOpuses/jobtechdev.se/pull/61)

### Removed
- Unnecessary/Duplicated Swagger files (https://github.com/MagnumOpuses/jobtechdev.se/pull/56)

# Changelog

## [1.0.1] - 2019-07-02

### Removed
- JobScanner preview links due to service being temporarily unavailable (https://github.com/MagnumOpuses/jobtechdev.se/pull/53)

## [1.0.0] - 2019-07-01

### Added
- Cookie policy and cookie banner on front page and documentation pages (https://github.com/MagnumOpuses/jobtechdev.se/pull/39, https://github.com/MagnumOpuses/jobtechdev.se/pull/49)
- Readme instructions on how to build/run site in 'stage'-mode (https://github.com/MagnumOpuses/jobtechdev.se/pull/23)
- New event 'Tech for lunch!' (https://github.com/MagnumOpuses/jobtechdev.se/pull/25)
- Information about closure of old YrkesInfo & RAF API (https://github.com/MagnumOpuses/jobtechdev.se/pull/24)
- 'Theos'-styled pull-request template (https://github.com/MagnumOpuses/jobtechdev.se/pull/22, https://github.com/MagnumOpuses/jobtechdev.se/pull/33)
- Extra information about JobScanner showcase (https://github.com/MagnumOpuses/jobtechdev.se/pull/50)
- Added new shortcodes to allow tabbed content in markup (https://github.com/MagnumOpuses/jobtechdev.se/pull/49)

### Fixed
- Revapi not defined error (https://github.com/MagnumOpuses/jobtechdev.se/pull/38)
- Menu sliding bug in IE (https://github.com/MagnumOpuses/jobtechdev.se/pull/35)
- Featherlight popup to be dark themed (https://github.com/MagnumOpuses/jobtechdev.se/pull/44)
- Jobtech Dev logo in repository README.md (https://github.com/MagnumOpuses/jobtechdev.se/pull/48)

### Changed
- Upgraded Hugo to v0.55 (https://github.com/MagnumOpuses/jobtechdev.se/pull/34)
- Upgraded Hugo-theme-learn to v2.3.0 (https://github.com/MagnumOpuses/jobtechdev.se/pull/34)
- Fixed typo in swedish navbar (https://github.com/MagnumOpuses/jobtechdev.se/pull/31)
- Darkened the bold text in notice boxes (https://github.com/MagnumOpuses/jobtechdev.se/pull/37)
- Swagger UI theme to better fit Jobtechdev's dark themed website (https://github.com/MagnumOpuses/jobtechdev.se/pull/18)
- Upgraded PDF.js to v2.1.266 (https://github.com/MagnumOpuses/jobtechdev.se/pull/42)

### Removed
- Removed 'Vacancies' showcase (https://github.com/MagnumOpuses/jobtechdev.se/pull/43)
- Disabled language switching button in Docs pages (https://github.com/MagnumOpuses/jobtechdev.se/pull/49)

### Security
- CSP rule to allow image sources from 'online.swagger.io' (https://github.com/MagnumOpuses/jobtechdev.se/pull/32)
- CSP rule to allow blob image sources from whitelisted domains (https://github.com/MagnumOpuses/jobtechdev.se/pull/42)
