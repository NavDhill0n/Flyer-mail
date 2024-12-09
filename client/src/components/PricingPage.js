import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { FaCheckCircle } from "react-icons/fa";
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
        "Email tracking",
      ],
      badge: "Best Value",
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
      badge: "Most Popular",
    },
    {
      title: "Enterprise Plan",
      price: "$99/month",
      features: [
        "Unlimited emails",
        "Custom reports",
        "Priority onboarding",
        "API access",
      ],
      badge: "Premium",
    },
  ];

  return (
    <>
      <Header />
      <div className="pricing">
        {plans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <div className="badge">{plan.badge}</div>
            <h3>{plan.title}</h3>
            <p className="price">
              {plan.price} <span>/ month</span>
            </p>
            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <FaCheckCircle />
                  {feature}
                </li>
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
