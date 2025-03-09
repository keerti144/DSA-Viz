import React from "react";
import femaleUser from "./female-user.png";
import menu from "./menu.png";
import search from "./search.png";
import "./style.css";

export const DashboardOpen = () => {
  return (
    <div className="dashboard-open">
      <div className="div">
        <div className="group">
          <div className="search-wrapper">
            <img className="search" alt="Search" src={search} />
          </div>

          <div className="overlap-group">
            <div className="rectangle" />

            <div className="text-wrapper">Search here</div>
          </div>
        </div>

        <div className="text-wrapper-2">WELCOME BACK,SOMENAME!!</div>

        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="rectangle-2" />

            <div className="text-wrapper-3">Start new Topic</div>
          </div>
        </div>

        <div className="overlap-group-wrapper">
          <div className="overlap">
            <div className="rectangle-2" />

            <div className="text-wrapper-4">Try a challenge</div>
          </div>
        </div>

        <div className="group-2">
          <div className="text-wrapper-5">Continue learning</div>

          <div className="rectangle-3" />

          <div className="rectangle-4" />

          <div className="rectangle-5" />

          <div className="rectangle-6" />

          <div className="rectangle-7" />
        </div>

        <div className="group-3">
          <div className="text-wrapper-5">Continue tests</div>

          <div className="rectangle-8" />

          <div className="rectangle-9" />

          <div className="rectangle-10" />

          <div className="rectangle-11" />

          <div className="rectangle-12" />
        </div>

        <div className="group-4">
          <div className="overlap-2">
            <div className="rectangle-13" />

            <div className="text-wrapper-6">About us</div>
          </div>

          <div className="rectangle-14" />
        </div>

        <div className="div-wrapper">
          <div className="overlap-3">
            <div className="rectangle-15" />

            <div className="rectangle-16" />

            <div className="rectangle-17" />

            <div className="rectangle-18" />

            <div className="rectangle-19" />

            <div className="rectangle-20" />

            <div className="rectangle-21" />

            <div className="group-5">
              <div className="overlap-group-2">
                <div className="rectangle-22" />

                <div className="group-6" />
              </div>
            </div>

            <div className="group-7">
              <div className="group-8">
                <div className="overlap-group-3">
                  <div className="text-wrapper-7">AlgoRize</div>

                  <div className="overlap-4">
                    <img className="menu" alt="Menu" src={menu} />

                    <div className="rectangle-23" />
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

              <div className="group-9">
                <div className="overlap-5">
                  <div className="text-wrapper-8">Visualize</div>
                </div>
              </div>

              <div className="group-10">
                <div className="overlap-5">
                  <div className="test">Test Yourself</div>
                </div>
              </div>

              <div className="group-11">
                <div className="overlap-5">
                  <div className="text-wrapper-9">Dashboard</div>
                </div>
              </div>

              <div className="group-12">
                <div className="overlap-5">
                  <div className="text-wrapper-10">Notifications</div>
                </div>
              </div>

              <div className="group-13">
                <div className="overlap-5">
                  <div className="text-wrapper-8">Settings</div>
                </div>
              </div>

              <div className="group-14">
                <div className="overlap-6">
                  <div className="rectangle-24" />

                  <div className="text-wrapper-11">Help</div>
                </div>
              </div>
            </div>

            <div className="group-wrapper">
              <div className="group-15" />
            </div>

            <div className="group-16">
              <div className="group-17" />
            </div>

            <div className="group-18">
              <div className="group-19" />
            </div>

            <div className="group-20">
              <div className="group-21" />
            </div>

            <div className="group-22">
              <div className="group-23" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};