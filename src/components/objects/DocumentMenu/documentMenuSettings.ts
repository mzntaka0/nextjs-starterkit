type CenterStyle = {
  position: "relative" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "-webkit-sticky" | "absolute" | "fixed" | "static" | "sticky" | undefined,
  display: string,
  justifyContent: string
}

// TODO: get these types from antd library
type Meta = {
  theme: "dark" | "light" | undefined,
  mode: "inline" | "vertical" | "horizontal",
  defaultSelectedKeys: string[],
  style: CenterStyle
}

type Content = {
  url: string,
  text: string,
  key: string,
  disabled?: boolean
}

type DocumentMenuSettings = {
  meta: Meta,
  contents: Content[]
}


const documentMenuSettings: DocumentMenuSettings = {
  meta: {
    theme: "light",
    mode: "horizontal",
    defaultSelectedKeys: ["all"],
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    }
  },
  // TODO: only text value should be editable and be automatically converted to other value(url, key)
  contents: [
    {
      url: "/",
      text: "All",
      key: "all",
    },
    {
      url: "/about",
      text: "About",
      key: "about",
    },
    {
      url: "/testimonial",
      text: "Testimonial",
      key: "testimonial",
    },
    {
      url: "/category1",
      text: "Category1",
      key: "category1",
      disabled: true
    },
    {
      url: "/category2",
      text: "Category2",
      key: "category2",
      disabled: true
    },
    {
      url: "/category3",
      text: "Category3",
      key: "category3",
      disabled: true
    },
  ]
}


export default documentMenuSettings
