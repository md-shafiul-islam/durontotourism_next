import React, {useEffect} from "react";
import { useSession } from "next-auth/react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { helperIsEmpty } from "../../utils/helper/helperAction";
import { getWalletAction } from "../../redux/actions/WalletAction";

const WalletSidebar = (params) => {
  console.log("WalletSidebar wallet, ", params);

  const {status, data}= useSession();
  useEffect(() => {
      if(status === "authenticated"){
        console.log("Current Authenticate Status, before Run...  ", status);
          params.getWalletAction(data.accessToken);
      }
  }, [status]);

  const getWalletAmount = () => {
    if (!helperIsEmpty(params.wallet)) {
      if (params.wallet.status) {
        if (!helperIsEmpty(params.wallet.data)) {
          return params.wallet.data.totalAmount;
        }
      }
    }

    return "0.00";
  };

  const getCurrencyCode = () => {
    if (params.currency) {
      return <span className="currency">{params.currency}</span>;
    }

    return <span className="currency">&#2547;</span>;
  };
  return (
    <Card className="wallet-card">
      <Card.Body className="wallet-sidebar">
        <div className="title-area">
          <div className="amount">{getCurrencyCode()} {getWalletAmount()}</div>
          <div className="sub-text">Wallet Balance</div>
        </div>

        <div className="cash-area">
          <div className="my-cash">
            <div className="icon-content">
              <div className="icon">{getCurrencyCode()}</div>
              <div className="badge-area">
                <div className="title">My Wallet</div>
                <div className="badge">use unrestrictions</div>
              </div>
            </div>
            <div className="amount-area">
              <span className="amount">{getCurrencyCode()} {getWalletAmount()}</span>
              {/**<span className="aks-text">How to earn?</span> */}
            </div>
          </div>
          <div className="reward-bonus">
            <div className="icon-content">
              <div className="icon">{getCurrencyCode()}</div>
              <div className="badge-area">
                <div className="title">Reward Bonus</div>
                <div className="badge">Use with restrictions</div>
              </div>
            </div>
            <div className="amount-area">
              {params.currency ? (
                <span className="amount">
                  {getCurrencyCode()} {getWalletAmount()}
                </span>
              ) : (
                <span className="amount">{getCurrencyCode()} 0.00</span>
              )}
              {/**
                        <span className="aks-text">
                        <Link href="/exm-earn">
                          <a>How to earn?</a>
                        </Link>
                      </span>
                      */}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

WalletSidebar.prototypes = {
    getWalletAction: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
  };

const mapStateToProps = (state)=>{
    return {}
}

export default connect(mapStateToProps, {getWalletAction})(WalletSidebar);
