// TODO: get these types from antd library
type Meta = {
  theme: "dark" | "light" | undefined,
  mode: "inline" | "vertical" | "horizontal",
  defaultSelectedKeys: string[]
}

type Content = {
  url: string,
  text: string,
  key: string,
  icon: string,
  disabled?: boolean
}

type SideBarSettings = {
  meta: Meta,
  contents: Content[]
}


const sidebarSettings: SideBarSettings = {
  meta: {
    theme: "dark",
    mode: "inline",
    defaultSelectedKeys: ["home"]
  },
  contents: [
    {
      url: "/",
      text: "Home",
      key: "home",
      icon: "home"
    },
    {
      url: "/company",
      text: "Company",
      key: "company",
      icon: "idcard",
      disabled: false
    },
    {
      url: "/analytics",
      text: "Analytics",
      key: "analytics",
      icon: "line-chart",
      disabled: true
    },
    {
      url: "/settings",
      text: "Settings",
      key: "settings",
      icon: "setting",
      disabled: true
    },
    {
      url: "/logout",
      text: "Logout",
      key: "logout",
      icon: "logout"
    }
  ]
}


export default sidebarSettings
