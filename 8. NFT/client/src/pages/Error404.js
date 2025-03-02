/*!

=========================================================
* BLK Design System PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

export default function Error400() {
  const wrapper = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("error-page");
    return function cleanup() {
      document.body.classList.remove("error-page");
    };
  }, []);
  return (
    <>
      <div className="wrapper" ref={wrapper}>
        <div className="page-header error-page header-filter">
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                "url(" + require("assets/images/braden-collum.jpg") + ")",
            }}
          />
          <Container>
            <Row>
              <Col md="12">
                <h1 className="title">404</h1>
                <h2 className="description">Page not found :(</h2>
                <h4 className="description">
                  Ooooups! Looks like you got lost.
                </h4>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
