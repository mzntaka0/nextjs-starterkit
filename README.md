# nextjs-starterkit
A useful starterkit for next.js w/ TypeScript, GraphQL and Antdesign


### Dependencies
See "dependencies" values in package.json



### Initialization
```
git clone https://github.com/mzntaka0/nextjs-starterkit.git ./${project_name}
cd ${project_name}
yarn install
cp .env.example .env
```


### The policy of component categorization
* based on Atomic Design
* based on Presentational and Container

#### The issues of Atomic Design or Presentational/Container
* The names of each categories might not be so intuitive
* (Too many categories)
* Although both templates and pages have a same directory structure, these seems to be like unnecessarily duplicated.
* The catogrizations, Presentational and Container, are more like an abstract concepts that shouldn't be represented as a directory. (Or still need P/C to distinguish their responsibilities)

#### Proposal for a new categorizations of components.
|New Category|Atomic Design|P/C|description|
-----|-----|-----|-----
|\_atoms|atoms, molecules|Presentational|This represents a minimum part of component, only having local state that doesn't rely on anything|
|objects|molecules|Presentational|This represents each "objects" concerned by the poinf of view from OOUI.|
|sections|organism|Presentational or Container|This represents a block of components, which could be Header, Footer, Contents, etc. This size of components are gonna be a unit of redux management. Refer here: https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.c4yhhvk0d|
|layouts|templates|Container|This represents a layout of the page probably combinating some blocks. This is included in each \_page directory.|
|\_pages|pages|Container|This represents a instance of each layouts, possibly fetching some data from outside(API server or local store)|
|pages|pages|Container|This is just a instance of \_pages(each \_pages/${page}/index.tsx would be just imported and exported. See an example here: https://github.com/mzntaka0/nextinit/blob/develop/src/pages/index.tsx |

* I would like to use `parts` rather than `atoms` to include a nuance of both atoms and molecules, but I accepted to use that because of the order issue of directory from smaller to bigger concepts.
* layouts would like to be created by the idea inspirated by this article (https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/) (Bonus: Add a `getLayout` function to your layout components)
* to avoid prerendering of non-page files for each particular pages, took an idea of creating \_page directory in components(https://github.com/zeit/next.js/issues/3728#issuecomment-363964953). pages directory only call each index file from \_pages

#### The structure of directory
```ts
src
├ components/
| ├ _atoms/
| ├ objects/
| ├ sections/
| └ _pages/
|     ├ index/
|     | ├ index.tsx
|     | └ lib/
|     |   ├ fetch.tsx
|     |   └ layout.tsx
|     ├ about/
|     | ├ index.tsx
|     | └ lib/
|     |   ├ fetch.tsx
|         └ layout.tsx
├ pages/
| ├ index.tsx
| ├ about.tsx
| .
. .
. .
.
```

### Where to write a layout code
Write here: `components/_pages/${page}/lib/layout.tsx`
This file is gonna be called in index file of each page and re-called in _app.tsx


### TODO
- [ ] Refactor a data fetching code based on Clean Architecture 
- [ ] Consider that components/\_pages/${page}/lib directory is needed or not. -> extract them to each page's root directory?
- [ ] Refactor resolver of GraphQL Server
- [ ] Auto creating pages files according to components/\_pages/
- [ ] Reflect awesome codes of this page: https://github.com/zeit/next.js/tree/canary/examples/with-typescript-graphql
- [ ] Is the new proposed directory structure really good?
- [ ] Separate Presentator and Container inside of each component(atoms)
