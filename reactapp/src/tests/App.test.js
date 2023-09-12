import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Sample customer data for testing
const sampleCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
};

// Sample account data for testing
const sampleAccount = {
  accountNumber: '123456',
  balance: 1000,
};

function customTextMatcher(content) {
  return (text, node) => {
    const hasText = (node) => node.textContent.includes(content);
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  };
}

test('renders_the_application_header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/Banking Retail App/i);
  expect(headerElement).toBeInTheDocument();
});

test('creates_a_customer_and_displays_it_in_the_customer_list', () => {
  const { getByText, getByLabelText, getByTestId } = render(<App />);
  const createCustomerButton = getByText(/Add Customer/i);

  // Click the "Create Customer" button
  fireEvent.click(createCustomerButton);

  // Fill in the customer information
  const firstNameInput = getByLabelText(/First Name:/i);
  const lastNameInput = getByLabelText(/Last Name:/i);
  const emailInput = getByLabelText(/Email:/i);

  fireEvent.change(firstNameInput, { target: { value: sampleCustomer.firstName } });
  fireEvent.change(lastNameInput, { target: { value: sampleCustomer.lastName } });
  fireEvent.change(emailInput, { target: { value: sampleCustomer.email } });

  // Click the "Create Customer" button in the modal
  const createCustomerModalButton = getByText(/Add Customer/i);
  fireEvent.click(createCustomerModalButton);

  // Verify if the customer is displayed in the customer list
  const customerListItem = getByTestId('customer-list-item');
  expect(customerListItem).toHaveTextContent(`${sampleCustomer.firstName} ${sampleCustomer.lastName}`);
});

test('creates_an_account_and_displays_it_in_the_account_list', () => {
  const { getByText, getByLabelText, getByTestId } = render(<App />);
  const createAccountButton = getByText(/Add Account/i);

  // Click the "Create Account" button
  fireEvent.click(createAccountButton);

  // Fill in the account information
  const accountNumberInput = getByLabelText(/Account Number:/i);
  const initialBalanceInput = getByLabelText(/Initial Balance:/i);

  fireEvent.change(accountNumberInput, { target: { value: sampleAccount.accountNumber } });
  fireEvent.change(initialBalanceInput, { target: { value: sampleAccount.balance } });

  // Click the "Create Account" button in the modal
  const createAccountModalButton = getByText(/Add Account/i);
  fireEvent.click(createAccountModalButton);

  // Verify if the account is displayed in the account list
  const accountListItem = getByTestId('account-list-item');
  expect(accountListItem).toHaveTextContent(`Account Number: ${sampleAccount.accountNumber}, Balance: $${sampleAccount.balance}`);
});

