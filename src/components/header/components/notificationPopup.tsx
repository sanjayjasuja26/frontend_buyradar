import dotImg from "assets/images/notifications/dot@2x.png";
import Img1 from "assets/images/notifications/img1@2x.png";
import Img2 from "assets/images/notifications/img2@2x.png";
import Img3 from "assets/images/notifications/img3@2x.png";
import Img4 from "assets/images/notifications/img4@2x.png";

const NotificationPopup = () => {
  return (
    <div
      className="dropdown-menu customdropdown-menu"
      // ref={myRef}
    >
      <div className="noti-heading">
        <h3>Notifications</h3>
        <img src={dotImg} alt="img" />
      </div>
      <div className="notification-list">
        <div className="new-see">
          <h4>New</h4>
          <h5>
            <a href="/">See all</a>
          </h5>
        </div>
        <div className="notilisrt">
          <div className="notiimg">
            <img src={Img1} alt="img" />
          </div>
          <div className="notitext">
            <h4>
              <span className="redtxt">50% Off</span> in Stylo.com Shoes. Don't
              forget <br />
              To Check It Out..
            </h4>
            <h5>2 min ago</h5>
          </div>
        </div>
        <div className="notilisrt">
          <div className="notiimg">
            <img src={Img2} alt="img" />
          </div>
          <div className="notitext">
            <h4>
              Package from your order
              <span className="purpletxt">#290P393</span>
              <br /> has arrived.
            </h4>
            <h5>1 hour ago</h5>
          </div>
        </div>
      </div>
      <div className="notification-list">
        <div className="new-see">
          <h4>Last week</h4>
        </div>
        <div className="notilisrt">
          <div className="notiimg">
            <img src={Img3} alt="img" />
          </div>
          <div className="notitext">
            <h4>
              <span className="redtxt">Flash Sale</span> Starting
              <span className="purpletxt">tomorrow.</span>
              <br /> forget to check it out..
            </h4>
            <h5>03 Aug 2021</h5>
          </div>
        </div>
        <div className="notilisrt">
          <div className="notiimg">
            <img src={Img4} alt="img" />
          </div>
          <div className="notitext">
            <h4>
              <strong>Promo Code:</strong>
              <span className="redtxt">5P30FA38#</span>
              <br /> Don't forget to use it...
            </h4>
            <h5>02 Aug 2021</h5>
          </div>
        </div>
        <div className="notilisrt">
          <div className="notiimg">
            <img src={Img3} alt="img" />
          </div>
          <div className="notitext">
            <h4>
              <span className="purpletxt">Red Greek Sandals</span>
              are available on reduce price.. Just check it out..
            </h4>
            <h5>02 Aug 2021</h5>
          </div>
        </div>
        <div className="notilisrt">
          <div className="notiimg">
            <img src={Img2} alt="img" />
          </div>
          <div className="notitext">
            <h4>
              Package from your order
              <span className="purpletxt">#290P393</span> has arrived.
            </h4>
            <h5>1 hour ago</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
