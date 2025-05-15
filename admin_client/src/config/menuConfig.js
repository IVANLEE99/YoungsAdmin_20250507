import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: <PieChartOutlined />,
  },
  {
    title: "商品",
    key: "/products",
    icon: <ContainerOutlined />,
    children: [
      {
        title: "商品分类",
        key: "/category",
        icon: <DesktopOutlined />,
      },
      {
        title: "商品管理",
        key: "/product",
        icon: <ContainerOutlined />,
      },
    ],
  },
  {
    title: "用户管理",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    icon: <UserOutlined />,
  },
  {
    title: "图表",
    key: "/charts",
    icon: <PieChartOutlined />,
    children: [
      {
        title: "柱状图",
        key: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "折线图",
        key: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "饼图",
        key: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
];

export default menuList;
