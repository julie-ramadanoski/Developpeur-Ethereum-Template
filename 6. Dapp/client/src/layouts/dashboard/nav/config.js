// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
    showToOwner: true,
    showToRegistered: true,
    showToNonRegistred: true,
  },
  {
    title: "participer",
    path: "/dashboard/participer",
    icon: icon("ic_user"),
    showToOwner: false,
    showToRegistered: true,
    showToNonRegistred: false,
  },
  {
    title: "logs",
    path: "/dashboard/logs",
    icon: icon("ic_cart"),
    showToOwner: true,
    showToRegistered: true,
    showToNonRegistred: false,
  },
  {
    title: "solidocs",
    path: "/dashboard/documentation",
    icon: icon("ic_blog"),
    showToOwner: true,
    showToRegistered: true,
    showToNonRegistred: true,
  },
  {
    title: "storybook",
    href: true,
    path: "https://636d3b6242ab8408095073c6-opjfnzhtuc.chromatic.com/",
    icon: icon("ic_lock"),
    showToOwner: true,
    showToRegistered: true,
    showToNonRegistred: true,
  },
];

export default navConfig;