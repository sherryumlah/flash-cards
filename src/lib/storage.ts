import { useEffect, useMemo, useState } from "react";
import type { AppState, Deck } from "../types";


const LS_KEY = "flash-cards-v1";

const defaultState: AppState = {
  decks: [
    {
      id: crypto.randomUUID(),
      name: "Leading SAFe Exam Essentials (6.0)",
      cards: [
        // { id: crypto.randomUUID(), front: "", back: "", mnemonic: "" },
        // Quiz MC
        { id: crypto.randomUUID(), front: "What are the three parts of the Inspect and Adapt Event that happens during the Innovation and Planning iteration (last PI iteration)?", back: "1. PI system demo, 2. Measurement (Quantitative and Qualitative), 3. Problem-solving workshop", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the structure of epic hypothesis statements?", back: "For, who, the, is a, that, unlike, our solution", mnemonic: "For whom the bell tolls is a poem that's unlike our solution" },
        { id: crypto.randomUUID(), front: "What are the part of the portfolio canvas template?", back: "Value propositions, key partners, key activities, key resources, cost structure, revenue streams", mnemonic: "value props, key par cost revenue" },
        { id: crypto.randomUUID(), front: "Which aspect of leading by example includes modeling desired professional behaviors? A) Courage, B) Emotional Competence, C) Growing Others, D) Authenticity ", back: "D) Authenticity", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is used to describe functional and non-functional requirements? A) Milestones, B) Features, C) Enablers, D) Architectural Runway", back: "B) Features", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the biggest benefit of decentralized decision-making? A) Reduces delays, B) Improves transparency, C) Removes accountability from leaders, D) Ensures strategic decisions are made collaboratively", back: "A) Reduces Delays", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the first step in Kotter's 8-step process for leading change? A) Create a sense of urgency, B) Generate short-term wins, C) Enlist a volunteer army, D) Build a guiding coalition", back: "A) Create a sense of urgency", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the second step in Kotter's 8-step process for leading change? A) Create a sense of urgency, B) Generate short-term wins, C) Enlist a volunteer army, D) Build a guiding coalition", back: "D) Build a guiding coalition", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the sixth step in Kotter's 8-step process for leading change? A) Create a sense of urgency, B) Generate short-term wins, C) Enlist a volunteer army, D) Build a guiding coalition", back: "B) Generate short-term wins", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is part of the role of Product Management? A) To prioritize the ART Backlog, B) To assign business value to Features, C) To facilitate backlog refinement, D) To define Enablers", back: "A) To prioritize the ART Backlog", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Volume, complexity, knowledge, and uncertainty are all qualities of what? A) Risks, B) Cost of Delay, C) Weighted shortest job first (WSJF), D) Story points", back: "D) Story points", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is one Design Thinking measure of solution success? A) Sustainability, B) Marketability, C) Reliability, D) Scalability", back: "A) Sustainability (Desirable, viable, feasible)", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Reviewing the organization's architecture vision during the first day of PI Planning is an example of what SAFe Core Value? A) Relentless Improvement, B) Transparency, C) Alignment, D) Respect for People", back: "C) Alignment", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Speaking with a common language and constantly checking for understanding are examples of what SAFe Core Value? A) Relentless Improvement, B) Transparency, C) Alignment, D) Respect for People", back: "C) Alignment", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Growing people through coaching or embracing 'your customer is whoever consumes your work' are examples of what SAFe Core Value? A) Relentless Improvement, B) Transparency, C) Alignment, D) Respect for People", back: "D) Respect for People", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Creating a constant sense of urgency, reflecting and adapting quickly, or building a problem-solving culture are examples of what SAFe Core Value? A) Relentless Improvement, B) Transparency, C) Alignment, D) Respect for People", back: "A) Relentless Improvement", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the next step in the SAFe Implementation Roadmap after organizing around value? A) Enhance the Portfolio, B) Prepare for ART launch, C) Create the implementation plan, D) Train teams and launch ARTs", back: "C) Create the implementation plan", mnemonic: "TOPP Trai L Execs Stream portfolio acceleration. Train, Organize around value, create plan, prepare for ART launch, Launch, execute, more value streams, enhance portfolio, accelerate" },
        { id: crypto.randomUUID(), front: "Turn mistakes into learning moments, create a trust-based environment, and visualize work are examples of which SAFe Core Value? A) Alignment, B) Transparency, C) Respect for People, D) Relentless Improvement", back: "B) Transparency", mnemonic: "ART I" },
        { id: crypto.randomUUID(), front: "Which of the Lean Thinking principles includes the activities from recognizing an opportunity through release and validation? A) Pursue perfection, B) Precisely specify value by product, C) Make value flow without interruptions, D) Identify the Value Stream for each product", back: "D) Identify the Value Stream for each product", mnemonic: "" },
        { id: crypto.randomUUID(), front: "On day two of PI Planning, management presents adjustments based on the previous day's management review and problem-solving meeting. What is one possible type of adjustment they could make? A) Change a team's plan, B) Create new User Stories, C) Redefine the length of the PI, D) Adjust business priorities", back: "D) Adjust business priorities", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are possible changes management might make as planning adjustments after PI Planning Day 1?", back: "Adjust Business priorities, Make Changes to Scope, Adjust Vision, Realign work and teams", mnemonic: "Prioritize, Change Vision, Scope, Realign " },
        { id: crypto.randomUUID(), front: "What does the art planning board show? A) Epics, B) Risks, C) Capacity and Load, D) Significant Dependencies", back: "D) Significant Dependencies", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are the items on an art planning board?", back: "Features, Milestone or Event, Significant Dependencies", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Who has content authority to make decisions at the User Story level during PI Planning? A) Agile Team, B) Product Owner, C) Scrum Master / Team Coach, D) Release Train Engineer", back: "B) Product Owner", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Which of the following helps to align strategy and execution? A) Agile Product Delivery, B) Lean Portfolio Management, C) Team and Technical Agility, D) Organizational Agility", back: "B) Lean Portfolio Management", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is one of the five basic Agile quality practices applicable to all Agile Teams? A) Using non-functional requirements, B) Decentralized decision-making, C) Creating the Architectural Runway, D) Shift learning left", back: "D) Shift learning left - reveal problems sooner, take corrective action with minimum impact", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are basic agile quality practices?", back: "Shift learning left, Pairing and Peer review, Collective ownership and T-shaped skills, Artifact standards and definition of done, workflow automation", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Which statement is true about uncommitted objectives? A) They do not get assigned a business value score, B) The work to deliver uncommitted objectives is not planned into the Iterations during PI planning, C) They help improve predictability, D) They are extra things the team can do if they have time ", back: "C) They help improve the predictability of delivering business value", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What should a team do if they have low confidence in meeting a PI objective?", back: "It should be moved to Uncommitted Objectives", mnemonic: "" },
        { id: crypto.randomUUID(), front: "True or False: Uncommitted objectives can be extra things the team works on if they have time", back: "False", mnemonic: "" },
        { id: crypto.randomUUID(), front: "True or False: Uncommitted objectives are still included in the PI planning commitment", back: "False", mnemonic: "" },
        { id: crypto.randomUUID(), front: "True or False: Uncommitted objectives count when calculating load", back: "True", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are uncommitted objectives?", back: "Work that is planned and important but carries uncertainty (dependencies, risks, new tech, etc.) They count toward load (capacity) but not commitment metrics.", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is 'load' in PI Planning?", back: "Load refers to how much work a team plans to take on during a PI, measured against their available capacity (e.g., story points).", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Which is an aspect of systems thinking? A) The length of the queue impacts the wait time, B) Cadence makes routine everything that can be routine, C) Mastery drives intrinsic motivation, D) Optimizing a component does not optimize the system", back: "D) Optimizing a component does not optimize the system", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are story maps?", back: "Story maps help teams ideate, plan, and group activities in a workflow or user journey. They focus on delighting users.", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is used to capture the current state of the Portfolio and provide input for defining the future state? A) Portfolio Canvas, B) Portfolio Backlog, C) Portfolio Vision, D) Portfolio Kanban", back: "A) Portfolio Canvas", mnemonic: "" },

        // Core Values & Mindset
        { id: crypto.randomUUID(), front: "What is SAFe?", back:"Scaled Agile Framework as a flexible, virtual operating system for Business Agility organized around value streams", mnemonic: "Virtual agile OS streaming value" },
        { id: crypto.randomUUID(), front: "What two components make SAFe a dual operating system for businesses?", back:"Value Stream Network (speed of innovation) + Traditional Hierarchy (efficiency & stability)", mnemonic: "Duelers speed down an innovative stream following stable traditions" },
        { id: crypto.randomUUID(), front: "What are the benefits of implementing SAFe?", back:"Faster Time-to-Market, Improvements in Quality, Increase in Productivity, Engaged Employees", mnemonic: "Tiny Tim benefits: Fast Tiny Tim is engaged to quality and productivity" },
        { id: crypto.randomUUID(), front: "What are SAFe’s four Core Values?", back: "Alignment; Respect for People; Transparency; Relentless Improvement.", mnemonic: "ARTRI" },
        { id: crypto.randomUUID(), front: "SAFe Core Value: Alignment – key actions?", back: "Communicate vision/mission/strategy; connect strategy to execution; use common language; check understanding; know your customer.", mnemonic: "CLEAR - Communicate clearly, Link strategy to execution, Ensure common language, Ask for understanding, Remember the Customer" },
        { id: crypto.randomUUID(), front: "SAFe Core Value: Respect for People – examples?", back: "Value diversity; grow people via coaching; treat downstream as customers; build long-term partnerships.", mnemonic: "GROW – Give respect, Raise talent, Orient to customer, Win-win partnerships" },
        { id: crypto.randomUUID(), front: "SAFe Core Value: Transparency – behaviors?", back: "Trust-based environment; direct, open communication; turn mistakes into learning; visualize work; provide access to info.", mnemonic: "OPEN – Own mistakes, Public boards, Empathy, No secrets" },
        { id: crypto.randomUUID(), front: "SAFe Core Value: Relentless Improvement – behaviors?", back: "Create urgency; problem-solving culture; frequent reflection & adaptation; fact-based improvements; allow time/space for innovation.", mnemonic: "RELENT – Reflect, Experiment, Learn, Evolve, Never stop, Time for innovation" },
        { id: crypto.randomUUID(), front: "What are the 5 characteristics of a lean-agile mindset?", back: "1. Precisely specify value by product, 2. Identify Value Stream for each Product, 3. Make Value flow without interruptions, 4. Let the customer pull value from producer, 5. Pursue Perfection", mnemonic: "PIMPL principles" },
        { id: crypto.randomUUID(), front: "What are 10 SAFe Lean-Agile principles?", back: "1. Economic view, 2. Systems Thinking, 3. Assume Variability and preserve options, 4. Iterate fast and learn, 5. Milestones = objective evaluation, 6. Make value flow, 7. Cadence & Sync, 8. Unlock motivation, 9. Decentralize decision-making, 10. Organize around value", mnemonic: "" },
        { id: crypto.randomUUID(), front: "How do you Make Value Flow?", back: "Working in small batches and reducing delays is the fastest way to reduce time-to-market", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are the 4 Agile Values", back: "1. Individuals and interactions over processes and tools, 2. Working software over comprehensive documentation, 3. Customer collaboration over contract negotiation, 4. Responding to change over following a plan  ", mnemonic: "individuals create working software to collaborate with customers and respond to change - we don't like processes/tools/docs/contract negotiation/plans - pp contracts go to doc" },

        // Business Agility & Operating System
        { id: crypto.randomUUID(), front: "How is Business Agility defined in SAFe?", back: "The ability to compete and thrive in the digital age by quickly responding to market changes and emerging opportunities with innovative business solutions.", mnemonic: "Respond to opps with innovative solutions" },
        { id: crypto.randomUUID(), front: "Steps in a BAVS (Business Agility Value Stream) to respond quickly to business opportunity?", back:"Sense opportunity, Fund MVP, Organize around value, Connect to Customer, Deliver MVP, Pivot or Persevere, Deliver Value Continuously, Learn and Adapt", mnemonic: "BAVS: See fun org custom deliver, pivot, deliver, learn and adapt" },
        { id: crypto.randomUUID(), front: "What activities does Sensing the Opportunity core competency foster?", back: "Market research, Analysis of Data, Direct/Indirect Feedback, Direct Observation of customers", mnemonic: "Mark sensed opp by analyzing data, feedback, and customers" },
        { id: crypto.randomUUID(), front: "What core competency is required for sensing opportunity?", back: "Organizational Agility", mnemonic: "Organizational agility is sensible!" },
        { id: crypto.randomUUID(), front: "What core competency is required for funding MVP?", back: "Lean Portfolio Management (LPM)", mnemonic: "Fund MVP = LPM" },
        { id: crypto.randomUUID(), front: "What core competencies are needed to Organize Around Value", back: "Team and Technical Agility + Organizational Agility", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What core competency enables Customer Connection?", back: "Agile Product Delivery", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What core competencies enable Delivering MVP?", back: "Agile Product Delivery + Enterprise Solution Delivery", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What strategy helps teams and ARTs achieve customer ideals by empathizing with the user?", back: "Design Thinking", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What should the result of an MVP be?", back: "A set of facts to support decision-making whether to proceed with solution development. The decision point = stage in portfolio kanban system.", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What should the result of Learning and Adapting be?", back: "Learn from the BAVS by measuring competency, flow, and outcomes - Inspect and adapt", mnemonic: "Inspect and adapt the CFO (competency, flow, outcomes)" },
        { id: crypto.randomUUID(), front: "What metrics are flow metrics in BAVS?", back: "distribution, velocity, time, load, efficiency and predictability", mnemonic: "DVTLEP" },
        { id: crypto.randomUUID(), front: "What do Flow metrics in BAVS help determine?", back: "How fast the VS creates and delivers value, represented by distribution, velocity, time, load, efficiency and predictability", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are Outcomes metrics for the BAVS", back: "Value Stream KPIs that measure outcomes", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What do Outcomes metrics help ensure in the BAVS?", back: "The solution delivered benefits the customer and business", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What do Competency metrics evaluate in the BAVS?", back: "Organizational proficiency: SAFe business agility to assess overall portfolio progress and SAFe core competency to improve ARTs technical and business practices to achieve portfolio goal", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What do you need to deliver value continuously?", back: "Optimized continuous delivery pipeline to release on-demand value that meets customers' needs", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Describe the implementation roadmap", back:"Leaders are trained, organize around value, create an implementation plan, prepare for ART launch, train teams and launch ART, PI planning, coach ART execution, launch more ARTs and value streams, enhance portfolio, accelerate", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What enables enterprises to respond quickly to shifts in the market?", back: "Business Agility Value Stream", mnemonic: "BA VS = Business Adapts Very Swiftly" },
        { id: crypto.randomUUID(), front: "What does business agility require or demand?", back:"Organizing and pivoting without completely disrupting the existing hierarchy", mnemonic: "As hierarchical agility king, I demand you to pivot without disruption!"},

        // Team & Technical Agility / Flow
        { id: crypto.randomUUID(), front: "In the ART Kanban some steps have WIP limits. Why is this necessary?", back: "To ensure large queues are not forming", mnemonic: "Limit WIP, limit wait" },
        { id: crypto.randomUUID(), front: "What is critical to improving flow?", back: "Reduce the batch sizes of work and delays", mnemonic: "Small batches, smooth flow" },
        { id: crypto.randomUUID(), front: "Which is an aspect of systems thinking?", back: "Optimizing a component does not optimize the system", mnemonic: "Parts ≠ Whole – fix the system" },
        { id: crypto.randomUUID(), front: "The Lean principle 'make value flow without interruptions' means identifying what?", back: "Delays", mnemonic: "Flow = No Slow" },

        // Agile Product Delivery (PI Planning, WSJF, DevOps, Release on Demand)
        { id: crypto.randomUUID(), front: "What is PI Planning in SAFe?", back: "A cadence-based, ART-wide event that aligns all teams to a shared mission and Vision.", mnemonic: "All aboard the train" },
        { id: crypto.randomUUID(), front: "Typical PI Planning duration and cadence?", back: "Two days every 8–12 weeks (10 weeks is common).", mnemonic: "2 days, ~10-week heartbeat" },
        { id: crypto.randomUUID(), front: "What happens at the end of Day 1 in PI Planning?", back: "Management review & problem-solving to make scope/objective adjustments for Day 2.", mnemonic: "Day-1 Debrief, Day-2 Direction" },
        { id: crypto.randomUUID(), front: "How are Business Owners involved on Day 2?", back: "They assign business value (1–10) to Team PI Objectives.", mnemonic: "BOs Bestow BV" },
        { id: crypto.randomUUID(), front: "True or False: Uncommitted Objectives help improve predictability", back: "True", mnemonic: "Buffer for uncertainty improves predictability" },
        { id: crypto.randomUUID(), front: "What is the purpose of Customer Centricity?", back: "To understand the Customer's needs", mnemonic: "Center on the seeker" },
        { id: crypto.randomUUID(), front: "What type of map captures user workflows?", back: "Story Map", mnemonic: "Walk the path the customer walks" },
        { id: crypto.randomUUID(), front: "Weighted Shortest Job First (WSJF) formula (general case) is what?", back: "WSJF = Cost of Delay ÷ Job Duration.", mnemonic: "What Should Jesus Fish First? Shortest cod fish goes first" },
        { id: crypto.randomUUID(), front: "WSJF in SAFe (relative model) formula?", back: "WSJF = (User/Business Value + Time Criticality + Risk Reduction/Opportunity Enablement) ÷ Job Size.", mnemonic: "Value + Urgency + Risk cut, over Size" },
        { id: crypto.randomUUID(), front: "Components of Cost of Delay?", back: "User/Business Value; Time Criticality; Risk Reduction and/or Opportunity Enablement.", mnemonic: "VTR: Value, Time, Risk" },
        { id: crypto.randomUUID(), front: "Why use WSJF?", back: "To sequence work for maximum economic benefit by prioritizing high CoD and shorter duration.", mnemonic: "What pays soonest, first" },
        { id: crypto.randomUUID(), front: "Why is it important to decouple deployment from release?", back: "To enable releasing functionality on demand to meet business needs", mnemonic: "Deploy anytime, release when ready" },
        { id: crypto.randomUUID(), front: "What is the Continuous Delivery Pipeline (CDP)?", back: "Workflows and automation to deliver frequently across Continuous Exploration, Integration, Deployment, and Release on Demand.", mnemonic: "CE→CI→CD→RoD conveyor" },
        { id: crypto.randomUUID(), front: "Four elements of the CDP?", back: "Continuous Exploration; Continuous Integration; Continuous Deployment; Release on Demand.", mnemonic: "Explore, Integrate, Deploy, Release" },
        { id: crypto.randomUUID(), front: "DevOps goal in SAFe?", back: "Maximize speed and stability by aligning Dev, Ops, Security, Compliance, Business, and Architecture.", mnemonic: "Speed + Stability = Value" },
        { id: crypto.randomUUID(), front: "What is an Agile Release Train (ART)?", back: "A long-lived, self-organizing team of Agile teams (typically 5–12 teams) that delivers value on a cadence.", mnemonic: "Train of teams on time" },
        { id: crypto.randomUUID(), front: "Who prioritizes Features?", back: "Product Management.", mnemonic: "PM = Prioritize the Menu" },
        { id: crypto.randomUUID(), front: "Who has content authority at the User Story level during PI Planning?", back: "Product Owner", mnemonic: "PO owns the stories" },
        { id: crypto.randomUUID(), front: "What does a story point number represent?", back: "Volume, Uncertainty, Complexity, Knowledge", mnemonic: "Oh vuck, there are more stories to point"},
        { id: crypto.randomUUID(), front: "What is a Value Stream?", back: "The sequence of steps from idea to delivery and validation of value for a product/solution.", mnemonic: "Map from concept to cash" },

        // Lean Portfolio Management
        { id: crypto.randomUUID(), front: "What is a portfolio?", back: "A collection of development value streams", mnemonic:""},
        { id: crypto.randomUUID(), front: "What is a portfolio canvas?", back: "A template for identifying a specific SAFe portfolio. It captures the current state, defines the domain of the portfolio and key elements", mnemonic:""},

        { id: crypto.randomUUID(), front: "What are the input elements of portfolio strategy formulation?", back: "Enterprise Vision (core values, purpose, mission), Portfolio context, Enterprise Strategy, Distinctive Competence, Competitive environment, Financial Goals", mnemonic:""},
        { id: crypto.randomUUID(), front: "What are the output elements of portfolio strategy formulation?", back: "Strategic Themes, Value Stream Budgets", mnemonic:""},
        { id: crypto.randomUUID(), front: "What are Strategic Themes?", back: "Business objectives that drive future state of a portfolio and connect it to enterprise strategy. Provide context for portfolio vision and lean budgeting", mnemonic:""},
        { id: crypto.randomUUID(), front: "How is Lean Portfolio Management (LPM) involved in BAVS?", back: "Lean budgeting funds MVP", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the difference between TOWS and SWOT?", back: "The outcomes they create. TOWS: strategic options to create a better future state... SO, ST, WO, WT matrix. SWOT: uncover current situation", mnemonic:""},
        { id: crypto.randomUUID(), front: "How is the flow of Portfolio Epics managed?", back: "In the Portfolio Kanban", mnemonic: "The big board for big bets" },
        { id: crypto.randomUUID(), front: "What brings structure to analysis and decision making around Epics?", back: "Portfolio Kanban", mnemonic: "Structure in lanes" },
        
        { id: crypto.randomUUID(), front: "What do Strategic Themes influence directly?", back: "Lean budgets", mnemonic: "Themes steer streams (of funding)" },
        { id: crypto.randomUUID(), front: "What are the 4 Lean Budget Guardrails?", back: "Continuous Business Owner engagement, Approving Significant Initatives, Guiding investments by horizon, Applying capacity allocation", mnemonic: "The guard invests capacity in approving engaged business owners" },

        // Leading the Change / Implementation
        { id: crypto.randomUUID(), front: "What is the next step in the SAFe Implementation Roadmap after creating the implementation plan?", back: "Prepare for ART launch", mnemonic: "" },

        // Misc exam-aligned details
        { id: crypto.randomUUID(), front: "True or false: This statement is a value from the Agile Manifesto: Responding to change over following a plan", back: "True", mnemonic: "Plans change, people adapt" },
        { id: crypto.randomUUID(), front: "Which of the following helps to drive Agile Quality practices? Lean Portfolio Management, Lean Systems Engineering, DevOps and Release on Demand, Team and Technical Agility", back: "Team and Technical Agility", mnemonic: "" },
        { id: crypto.randomUUID(), front: "Building a problem-solving culture is an example of which Core Value?", back: "Relentless Improvement", mnemonic: "Solve to evolve" }
      ],
    },

    {
      id: crypto.randomUUID(),
      name: "SAFe Deep Practice",
      cards: [
      // Agile manifesto
        {
          id: crypto.randomUUID(),
          front: "What are the 12 principles of Agile?",
          back: `1) Satisfy the customer via early & continuous delivery.
                  2) Welcome changing requirements, even late.
                  3) Deliver working software frequently (prefer shorter timescales).
                  4) Business and developers work together daily.
                  5) Build around motivated people; give support & trust them.
                  6) Face-to-face conversation is most effective.
                  7) Working software is the primary measure of progress.
                  8) Maintain a sustainable, constant pace.
                  9) Continuous attention to technical excellence & good design.
                  10) Simplicity—maximize work not done.
                  11) Self-organizing teams create the best solutions.
                  12) Regularly reflect and adapt (inspect & adapt).`,
                      mnemonic: "The Train Ride Story — Picture a customer boarding a fast AGILE train: (1) They’re happy because features arrive early and often. (2) A surprise detour appears—no problem, we embrace it. (3) Cars keep arriving in short, frequent bursts. (4) Conductors (business) and engineers (devs) coordinate in the same cabin daily. (5) The crew is motivated and trusted to run the train. (6) They use clear face-to-face radio mics, not long documents. (7) Each stop shows a working carriage to prove progress. (8) The train runs at a steady, sustainable speed—no burnout. (9) Mechanics tune the engine for excellence and good design. (10) They travel light—only what’s needed (simplicity). (11) The crew self-organizes to handle surprises. (12) After each leg, they huddle, learn, and adjust the route."
        },

        // WSJF deep procedures & estimation details
        { id: crypto.randomUUID(), front: "Guidance when scoring WSJF columns?", back: "Relative estimation; one column at a time; include at least one ‘1’ per column using a Fibonacci-like scale.", mnemonic: "Fibo flows focus" },
        { id: crypto.randomUUID(), front: "Who should participate in WSJF?", back: "Business Owners, Product Managers, affected teams, key stakeholders.", mnemonic: "Decide with those who pay & do" },
        { id: crypto.randomUUID(), front: "Proxy for duration in WSJF?", back: "Use Job Size as a quick proxy for duration.", mnemonic: "Size ~ time" },
        { id: crypto.randomUUID(), front: "Two jobs have equal CoD; which first?", back: "Do the shorter duration job first.", mnemonic: "Shorter sooner" },
        { id: crypto.randomUUID(), front: "Two jobs have equal duration; which first?", back: "Do the higher CoD job first.", mnemonic: "Value first" },

        // Team-level ceremonies (deeper than exam needs)
        { id: crypto.randomUUID(), front: "What is the Planning Interval (PI) Planning in SAFe?", back: "Cadence-based event that serves as the heartbeat of ART, aligning teams.", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What are PI objectives?", back: "What each team intends to deliver in the upcoming PI - often related to features in backlog, a milestone like a trade show, or an enabler feature", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the Iteration Planning event in SAFe?", back: "Teams plan what and how for the next iteration; commit to iteration goals.", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is the Daily Stand-up?", back: "Short sync to share progress and blockers.", mnemonic: "3Qs: Yesterday, Today, Blockers" },
        { id: crypto.randomUUID(), front: "What is the Iteration Review (Team Demo)?", back: "Demo completed stories, get feedback.", mnemonic: "Show & know" },
        { id: crypto.randomUUID(), front: "What is the Iteration Retrospective?", back: "Inspect process, agree improvements.", mnemonic: "STAR – Stop, Try, Add, Remove" },

        // ART sync mechanics
        { id: crypto.randomUUID(), front: "What are ART Syncs in SAFe?", back: "Scrum of Scrums + PO/Coach Sync for delivery & content alignment; facilitated by RTE.", mnemonic: "SYNC – Share, Navigate, Coordinate" },
        { id: crypto.randomUUID(), front: "What is the Scrum of Scrums (SoS)?", back: "SMs & leaders coordinate cross-team delivery & impediments.", mnemonic: "Trains talk" },
        { id: crypto.randomUUID(), front: "What is the PO/Coach Sync?", back: "POs & coaches align on priorities, risks, and flow.", mnemonic: "Content cadence" },

        // Inspect & Adapt and PSW details
        { id: crypto.randomUUID(), front: "What happens during Inspect & Adapt (I&A)?", back: "PI System Demo, measure results, problem-solving workshop.", mnemonic: "FIX IT – Find, Inspect, X-ray, Identify, Take action" },
        { id: crypto.randomUUID(), front: "What are the six steps of the Problem-Solving Workshop?", back: "Agree problem; RCA; identify biggest root; restate; brainstorm; create improvement items.", mnemonic: "A.R.I.R.B.I. – A Really Insightful Review Brings Improvement" },

        // Extra techniques & details
        { id: crypto.randomUUID(), front: "Example techniques enabling separate deploy from release?", back: "Feature toggles; dark launches; safe testing in production.", mnemonic: "Ship dark, flip later" },
        { id: crypto.randomUUID(), front: "What is ROAMing risks?", back: "Resolve, Own, Accept, Mitigate at ART level.", mnemonic: "Tame risks: ROAM" },
        { id: crypto.randomUUID(), front: "What is the IP Iteration used for?", back: "Innovation, Planning, learning, and buffer for next PI.", mnemonic: "IP = Innovate & Plan" },
        { id: crypto.randomUUID(), front: "Why use relative estimation scales (1,2,3,5,8,13,20)?", back: "Faster consensus, ratio thinking, avoids false precision.", mnemonic: "Right-sized roughness" },
        { id: crypto.randomUUID(), front: "Who owns the ART backlog?", back: "Product Management (with broad input).", mnemonic: "PM curates the catalog" },
        { id: crypto.randomUUID(), front: "Who owns the Team backlog?", back: "Product Owner, with the team.", mnemonic: "PO pilots the plan" },
        { id: crypto.randomUUID(), front: "What is a Feature (SAFe)?", back: "Service fulfilling a stakeholder need; sized for a PI; with benefit hypothesis & acceptance criteria.", mnemonic: "Feature = fit-for-PI service" },
        { id: crypto.randomUUID(), front: "What is an Enabler?", back: "Backlog item that explores/builds architecture, infrastructure, or compliance foundations.", mnemonic: "Enablers enable future flow" },
        { id: crypto.randomUUID(), front: "What is a Story?", back: "Team-sized value slice with acceptance criteria; completed within an iteration.", mnemonic: "Small slice, shipped soon" },
        { id: crypto.randomUUID(), front: "What is a Portfolio Epic?", back: "A significant solution development initiative: business epics and enabler epics; typically span multiple value streams and PIs.", mnemonic: "" },
        { id: crypto.randomUUID(), front: "What is an MVP in SAFe Portfolio?", back: "Smallest experiment to validate the epic’s hypothesis (pivot/persevere/stop).", mnemonic: "MVP = Measure Value Promptly" }
      ],
    },
  ],
  activeDeckId: null,
  knownByDeck: {},
};


export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as AppState) : defaultState;
  } catch {
    return defaultState;
  }
});

useEffect(() => {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}, [state]);

// Derived helpers
const activeDeck: Deck | null = useMemo(() => {
  const id = state.activeDeckId ?? state.decks[0]?.id ?? null;
  return id ? state.decks.find((d) => d.id === id) ?? null : null;
}, [state.activeDeckId, state.decks]);

const known = useMemo(() => state.knownByDeck[activeDeck?.id ?? ""] ?? {}, [state, activeDeck]);

return { state, setState, activeDeck, known } as const;
}

export function exportJson(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(json: string): AppState {
  const parsed = JSON.parse(json) as AppState;
  if (!Array.isArray(parsed.decks)) throw new Error("Invalid decks");
  return parsed;
}

// --- CSV helpers (add to storage.ts) ---

// Split a CSV line with quoted fields and escaped quotes ("")
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'; // escaped quote
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function normHeader(h: string) {
  return h.trim().toLowerCase().replace(/\s+/g, "");
}

/**
 * Import cards from CSV text.
 * Headers supported:
 *   Required: front, back
 *   Optional: mnemonic
 *   Optional (multi-deck): deck
 *
 * Returns a new AppState built from the CSV contents.
 */
export function importCsv(csv: string): AppState {
  const lines = csv.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("CSV must include a header row and at least one data row.");
  }

  const header = splitCsvLine(lines[0]).map(normHeader);
  const idxDeck = header.indexOf("deck");
  const idxFront = header.indexOf("front");
  const idxBack = header.indexOf("back");
  const idxMnemonic = header.indexOf("mnemonic");

  if (idxFront === -1 || idxBack === -1) {
    throw new Error('CSV header must include "front" and "back". Optional: "mnemonic", "deck".');
  }

  // Build decks by name; default to "Imported" if no deck column
  const decksByName = new Map<string, Deck>();
  const ensureDeck = (name: string) => {
    const key = name || "Imported";
    let deck = decksByName.get(key);
    if (!deck) {
      deck = { id: crypto.randomUUID(), name: key, cards: [] };
      decksByName.set(key, deck);
    }
    return deck;
  };

  for (let r = 1; r < lines.length; r++) {
    const row = lines[r];
    // Skip blank rows
    if (!row.trim()) continue;

    const cells = splitCsvLine(row).map(s => s.trim());

    const front = cells[idxFront] ?? "";
    const back = cells[idxBack] ?? "";
    if (!front && !back) continue; // ignore empty lines

    const deckName = idxDeck !== -1 ? (cells[idxDeck] || "Imported") : "Imported";
    const deck = ensureDeck(deckName);

    const card: any = {
      id: crypto.randomUUID(),
      front,
      back,
    };

    if (idxMnemonic !== -1) {
      const m = cells[idxMnemonic];
      if (m) card.mnemonic = m;
    }

    deck.cards.push(card);
  }

  const decks = Array.from(decksByName.values());
  if (decks.length === 0) throw new Error("No valid rows found (need front/back).");

  return {
    decks,
    activeDeckId: decks[0].id ?? null,
    knownByDeck: {},
  };
}

/** (Optional) Export current state to CSV (multi-deck with 'deck' column). */
export function exportCsv(state: AppState): string {
  const rows: string[] = [];
  rows.push(`deck,front,back,mnemonic`);
  for (const d of state.decks) {
    for (const c of d.cards) {
      const esc = (s: string | undefined) => {
        const v = (s ?? "").replace(/"/g, `""`);
        // Quote if it contains comma, quote, or newline
        return /[",\n]/.test(v) ? `"${v}"` : v;
      };
      // @ts-ignore allow optional mnemonic even if your Card type doesn't have it yet
      rows.push(`${esc(d.name)},${esc(c.front)},${esc(c.back)},${esc((c as any).mnemonic)}`);
    }
  }
  return rows.join("\n");
}
