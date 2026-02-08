import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../styles/FactsSection.css";

const FactsSection = () => {
  const facts = [
    {
      id: 1,
      number: 20,
      suffix: "+",
      label: "Total cars",
      icon: "./assets/orange-car-icon.png",
    },
    {
      id: 2,
      number: 1500,
      suffix: "+",
      label: "Happy clients",
      icon: "./assets/orange-customer-icon.png",
    },
    {
      id: 3,
      number: 10,
      suffix: "+",
      label: "Total branches",
      icon: "./assets/orange-calendar-icon.png",
    },
    {
      id: 4,
      number: 500000,
      suffix: "+",
      label: "KM Driven",
      icon: "./assets/orange-mile-icon.png",
    },
  ];

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="facts-section" ref={ref}>
      <div className="facts-container">
        <div className="facts-header">
          <h2 className="facts-title">Facts in Numbers</h2>
          <p className="facts-subtitle">
            Our growth is driven by a commitment to quality, safety, and the
            satisfaction of every traveler we serve.
          </p>
        </div>

        <div className="facts-grid">
          {facts.map((fact) => (
            <div key={fact.id} className="fact-card">
              <div className="fact-icon">
                <img src={fact.icon} alt={fact.label} />
              </div>
              <div className="fact-content">
                <h3 className="fact-number">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={fact.number}
                      duration={2}
                      separator=","
                      suffix={fact.suffix}
                    />
                  ) : (
                    "0" + fact.suffix
                  )}
                </h3>
                <p className="fact-label">{fact.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactsSection;
