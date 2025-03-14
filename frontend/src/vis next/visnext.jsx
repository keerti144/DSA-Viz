import React from "react";
import femaleUser from "./female-user.png";
import menu from "./menu.png";
import "./style.css";

export const VisNext = () => {
  return (
    <div className="vis-next">
      <div className="div">
        <div className="group">
          <div className="overlap">
            <div className="rectangle" />

            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <div className="rectangle-2" />

                <div className="group-2" />
              </div>
            </div>

            <div className="group-wrapper">
              <div className="group-3" />
            </div>

            <div className="div-wrapper">
              <div className="group-4" />
            </div>

            <div className="group-5">
              <div className="group-6" />
            </div>

            <div className="group-7">
              <div className="group-8" />
            </div>

            <div className="group-9">
              <div className="group-10" />
            </div>
          </div>
        </div>

        <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="rectangle-3" />

            <div className="topic-name-visualise">
              Topic name&nbsp;&nbsp;- Visualise
            </div>
          </div>
        </div>

        <div className="rectangle-4" />

        <div className="group-11">
          <div className="overlap-3">
            <div className="rectangle-5" />

            <div className="a-l-g-o">
              A<br />L<br />G<br />O
            </div>
          </div>
        </div>

        <div className="group-12">
          <div className="overlap-3">
            <div className="rectangle-5" />

            <div className="c-o-d-e">
              C<br />O<br />D<br />E
            </div>
          </div>
        </div>

        <div className="group-13">
          <div className="overlap-3">
            <div className="rectangle-5" />

            <div className="e-x-p">
              E<br />X<br />P
            </div>
          </div>
        </div>

        <div className="group-14">
          <div className="group-15">
            <div className="overlap-group-2">
              <div className="text-wrapper">AlgoRize</div>

              <div className="overlap-4">
                <img className="menu" alt="Menu" src={menu} />

                <div className="rectangle-6" />
              </div>

              <div className="female-user-wrapper">
                <img
                  className="female-user"
                  alt="Female user"
                  src={femaleUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
