import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import "./styles/PricingPage.css";

const PricingPage = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "Free",
      features: [
        "Up to 500 emails/month",
        "Basic reporting",
        "Community support",
      ],
    },
    {
      title: "Pro Plan",
      price: "$25/month",
      features: [
        "Up to 10,000 emails/month",
        "Advanced reporting",
        "Priority support",
        "Automation tools",
      ],
    },
    {
      title: "Enterprise Plan",
      price: "$99/month",
      features: [
        "Unlimited emails",
        "Custom reports",
        "Dedicated account manager",
        "API access",
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="pricing">
        {plans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button className="select-plan">Select Plan</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default PricingPage;
