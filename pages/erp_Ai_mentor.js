import React from 'react';
import styles from "../styles/ERP/ERP.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class AiMentor extends React.Component {
  render() {
    return (
      <GlobalWrapper page={"aiMentor"}>
        <div className={styles.container}>
          {/* <h1 className={styles.header}>Ai Mentors and Expense</h1> */}
          <div className={styles.content}>
            <img src="/assets/aimentors.jpg" alt="Event" className={styles.eventImage} />
            <div className={styles.text}>
              <h2>Welcome to our AI Expenses </h2>
              <h3>My Profile</h3>
              <p>
                Welcome to our AI Expenses, your personalized financial assistant designed to
                help you manage your finances effortlessly. In the "My Profile" section,
                you can customize your financial experience by adding personal details, setting financial
                goals, and syncing your accounts. This section provides an overview of your financial health,
                tracks your spending habits, and offers tailored advice to help you stay on top of your finances.
              </p>
            </div>
          </div>
          <div className={styles.additionalText}>
            <h3>Bank Account Creation</h3>
            <p>
              Our seamless bank account creation feature allows you to link multiple bank accounts
              in just a few clicks. With secure integration, you can monitor your account balances,
              track transactions, and manage your finances from one central dashboard.
              Say goodbye to the hassle of logging into multiple banking platforms.
            </p>
            <h2>Category Management</h2>
            <p>
              Categorize your expenses and income for a clearer picture of your financial situation.
              Our intelligent categorization system automatically sorts your transactions into predefined
              categories such as groceries, utilities, entertainment, and more. You can also create custom categories to suit your specific needs.
            </p>
            <h2>Transactions for Budget Projection and Journal</h2>
            <p>
              Keep a detailed record of all your transactions with our budget projection and journal feature.
              Easily track your spending, identify trends, and forecast future expenses. Our intuitive journal helps you understand your spending patterns
              and adjust your budget accordingly to achieve your financial goals.
            </p>
            <h2>AI Mentor for Recurring Transactions Assistance</h2>
            <p>
              Our AI mentor is your personal financial coach, offering assistance with recurring transactions.
              It identifies regular expenses, such as subscriptions and bills, and
              helps you manage them efficiently. Get timely reminders and suggestions to optimize your
              recurring expenses and save more.
            </p>
            <h2>Income Tax Assistance</h2>
            <p>
              Navigating income tax can be daunting, but our income tax assistance feature simplifies
              the process. Receive personalized tax advice, calculate your tax liabilities,
              and ensure you're taking advantage of all eligible deductions.
              Our AI ensures you're always prepared for tax season, reducing stress and saving time.
            </p>
            <h2>Consulting</h2>
            <p>
              Need expert financial advice? Our consulting service connects you with professional
              financial advisors who can provide tailored guidance on budgeting, investments,
              debt management, and more. Get the expert advice you need to make informed financial decisions
              and secure your financial future.
            </p>
            <h2>To-Do Items or Pending List Reminders</h2>
            <p>
              Stay organized with our to-do items and pending list reminders.
              Whether it's paying a bill, renewing a subscription, or meeting with your financial advisor,
              our system ensures you never miss an important task. Set reminders, prioritize tasks,
              and keep your financial life in order.
            </p>
            <h2>Goal Settings for Short and Long Terms</h2>
            <p>
              Achieve your financial dreams with our goal-setting feature.
              Define your short-term and long-term financial goals, such as saving for a vacation,
              buying a house, or retirement planning. Track your progress, receive actionable insights,
              and stay motivated with personalized advice from our AI mentor.
            </p>
            <h2>Why Choose our AI Expenses ?</h2>
            <ul>
              <li><b>Comprehensive Financial Management:</b> From tracking expenses to setting financial goals, manage all aspects of your finances in one place.</li>
              <li><b>Personalized AI Assistance:</b> Benefit from tailored advice and insights to optimize your financial health.</li>
              <li><b>Secure and Confidential:</b> Your data is protected with top-tier security measures, ensuring your financial information remains private.</li>
              <li><b>Expert Consulting:</b> Access professional financial advice to make informed decisions and achieve your financial goals.</li>
            </ul>
            <p>
              Start your journey to financial freedom today with our AI Expenses.
              Sign up now and take control of your finances with confidence and ease.
            </p>
          </div>
        </div>
      </GlobalWrapper>
    );
  }
}

