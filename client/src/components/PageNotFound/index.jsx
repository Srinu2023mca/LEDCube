import React from "react";
import "./style.css"; 

const Page404 = () => {
  return (
    <section className="page_404 d-flex flex-column align-items-center">
      
      <div className="container-box">
        <div className="row">
        
          <div className="col-sm-12">
            
            <div className="col-sm-10 col-sm-offset-1 text-center">
            
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
            </div>
            <div className="content_box_404 d-flex flex-column align-items-center">
                <h3 className="h2">Look like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <a href="/" className="link_404">
                  Go to Home
                </a>
              </div>
          </div>
        </div>

       
      </div>
      
    </section>
  );
};

export default Page404;