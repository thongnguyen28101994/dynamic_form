import React, { useState } from "react";
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { schoolRoutes, parentRoutes } from "./routes";
import Header from "../components/Header/index";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const hist = createBrowserHistory();

const Home = () => {
  let { path, url } = useRouteMatch();
  const [collapsed, setSollapsed] = useState(false);
  console.log(schoolRoutes);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[0]}>
          {parentRoutes.map((s, index) => (
            <SubMenu key={index} icon={s.icon} title={s.name}>
              {schoolRoutes
                .filter((menuItem) => menuItem.parent === s.id)
                .map((s, index) => (
                  <Menu.Item key={index} icon={s.icon}>
                    <Link to={`${url}/${s.path}`}>{s.name}</Link>
                  </Menu.Item>
                ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header collapsed={collapsed} setSollapsed={setSollapsed} />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Router history={hist}>
            <Switch>
              {schoolRoutes.map((index, route) => (
                // Render more <Route>s with the same paths as
                // above, but different components this time.
                <Route
                  key={index}
                  path={`${path + route.path}`}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </Router>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
