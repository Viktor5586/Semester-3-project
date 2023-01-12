import React from "react";
export const Home = () => {
  return (
    <section id="about" className="bg-light">
      <div className="container p-4">
        <div className="row gx-4 justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-4 text-center">About our website</h2>
            <p className="lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.Sed
              ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </p>
            <ul>
              <li>Clickable nav links that smooth scroll to page sections</li>
              <li>
                Responsive behavior when clicking nav links perfect for a one
                page website
              </li>
              <li>
                Bootstrap's scrollspy feature which highlights which section of
                the page you're on in the navbar
              </li>
              <li>
                Minimal custom CSS so you are free to explore your own unique
                design options
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
