"use client";
import React from 'react';

export default function Workflow() {
  return (
    <section className="rt-workflow-v1">
      <div className="w-layout-blockcontainer rt-container-main w-container">
        <div className="rt-heading-bottom-gap rt-workflow-v1-top">
          <div className="rt-overflow-hidden">
            <div className="rt-sub-gap">
              <div className="rt-sub-text rt-sub-gredient">HOW IT WORKS</div>
            </div>
          </div>
          <div className="rt-overflow-hidden">
            <h2 className="rt-gap-off">
              Simple steps to streamline your <span className="rt-color-periwinkle-gray">daily project workflow</span>
            </h2>
          </div>
        </div>
        <div className="w-layout-grid rt-workflow-grid">
          <div className="rt-workflow-card">
            <div className="rt-workflow-number">01</div>
            <div className="rt-text-style-h5">Create and assign tasks</div>
            <p className="rt-no-margin rt-color-pale-periwinkle">Easily set up tasks, delegate responsibilities, and set clear deadlines for your team.</p>
          </div>
          <div className="rt-workflow-card">
            <div className="rt-workflow-number">02</div>
            <div className="rt-text-style-h5">Track real-time progress</div>
            <p className="rt-no-margin rt-color-pale-periwinkle">Monitor project milestones and daily achievements with automated status updates.</p>
          </div>
          <div className="rt-workflow-card">
            <div className="rt-workflow-number">03</div>
            <div className="rt-text-style-h5">Achieve team goals</div>
            <p className="rt-no-margin rt-color-pale-periwinkle">Deliver projects on time, boost productivity, and analyze performance effortlessly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
