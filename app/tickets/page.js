"use client"

import React, { useState, useEffect } from 'react';


const TicketsPage = () => {
  const [ticketCounts, setTicketCounts] = useState({
    child: 0,
    adult: 0,
    senior: 0,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false); // To track order placement
  const [orderStatus, setOrderStatus] = useState('idle');
  const [orderMessage, setOrderMessage] = useState('');

  const ticketPrices = {
    child: 10,    // Example prices
    adult: 20,
    senior: 15,
  };

  const handleTicketChange = (type, count) => {
    if (count >= 0) {
      setTicketCounts({
        ...ticketCounts,
        [type]: count,
      });
    }
  };

  const calculateTotalPrice = () => {
    let price = 0;
    price += ticketCounts.child * ticketPrices.child;
    price += ticketCounts.adult * ticketPrices.adult;
    price += ticketCounts.senior * ticketPrices.senior;
    return price;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [ticketCounts]);

  const handleOrderTickets = async () => {
    setIsOrdering(true);
    setOrderStatus('processing');
    setOrderMessage('Placing your order...');

    // Simulate an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const result = { success: true, orderId: '12345' }; //Simulate

      if (result.success) {
        setOrderStatus('success');
        setOrderMessage(`Your order has been placed successfully! Order ID: ${result.orderId}`);
        setTicketCounts({ child: 0, adult: 0, senior: 0 });

      } else {
        throw new Error('Failed to place order');
      }


    } catch (error) {
      setOrderStatus('error');
      setOrderMessage(`Order failed: ${error.message || 'An error occurred'}`);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-4 sm:p-6 lg:p-8" },
      React.createElement("div", { className: "max-w-3xl mx-auto space-y-6" },
        React.createElement("h1", { className: "text-3xl sm:text-4xl font-bold text-green-800 text-center" },
          "🎟️ Order Tickets"
        ),
        React.createElement("div", { className: "bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4" },
          React.createElement("h2", { className: "text-2xl font-semibold text-green-700" }, "Ticket Types"),
          React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
            // Child Tickets
            React.createElement("div", { className: "space-y-2" },
              React.createElement("label", { htmlFor: "child-tickets", className: "text-green-600 font-medium" }, "Child (3-15)"),
              React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("button", {

                    onClick: () => handleTicketChange('child', ticketCounts.child - 1),
                    disabled: ticketCounts.child <= 0,
                    className: "text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                  },
                  "-"
                ),
                React.createElement("input", {
                  id: "child-tickets",
                  type: "number",
                  min: "0",
                  value: ticketCounts.child,
                  onChange: (e) => handleTicketChange('child', parseInt(e.target.value, 10) || 0),
                  className: "w-16 text-center border border-gray-300 rounded-md",
                  "aria-label": "Number of child tickets"
                }),
                React.createElement("button", {

                    onClick: () => handleTicketChange('child', ticketCounts.child + 1),
                    className: "text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                  },
                  "+"
                ),
              ),
              React.createElement("p", { className: "text-sm text-gray-500" }, "Price: $", ticketPrices.child)
            ),

            // Adult Tickets
            React.createElement("div", { className: "space-y-2" },
              React.createElement("label", { htmlFor: "adult-tickets", className: "text-green-600 font-medium" }, "Adult (16-64)"),
              React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("button", {

                    onClick: () => handleTicketChange('adult', ticketCounts.adult - 1),
                    disabled: ticketCounts.adult <= 0,
                    className: "text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                  },
                  "-"
                ),
                React.createElement("input", {
                  id: "adult-tickets",
                  type: "number",
                  min: "0",
                  value: ticketCounts.adult,
                  onChange: (e) => handleTicketChange('adult', parseInt(e.target.value, 10) || 0),
                  className: "w-16 text-center border border-gray-300 rounded-md",
                  "aria-label": "Number of adult tickets"
                }),
                React.createElement("button", {

                    onClick: () => handleTicketChange('adult', ticketCounts.adult + 1),
                    className: "text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                  },
                  "+"
                ),
              ),
              React.createElement("p", { className: "text-sm text-gray-500" }, "Price: $", ticketPrices.adult)
            ),

            // Senior Tickets
            React.createElement("div", { className: "space-y-2" },
              React.createElement("label", { htmlFor: "senior-tickets", className: "text-green-600 font-medium" }, "Senior (65+)"),
              React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement("button", {

                  onClick: () => handleTicketChange('senior', ticketCounts.senior - 1),
                  disabled: ticketCounts.senior <= 0,
                  className: "text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                },
                  "-"
                ),
                React.createElement("input", {
                  id: "senior-tickets",
                  type: "number",
                  min: "0",
                  value: ticketCounts.senior,
                  onChange: (e) => handleTicketChange('senior', parseInt(e.target.value, 10) || 0),
                  className: "w-16 text-center border border-gray-300 rounded-md",
                  "aria-label": "Number of senior tickets"
                }),
                React.createElement("button", {

                  onClick: () => handleTicketChange('senior', ticketCounts.senior + 1),
                  className: "text-green-600 hover:bg-green-100 hover:text-green-700 rounded-full w-10 h-10 flex items-center justify-center border border-gray-300"
                },
                  "+"
                ),
              ),
              React.createElement("p", { className: "text-sm text-gray-500" }, "Price: $", ticketPrices.senior)
            )
          ),

          React.createElement("div", { className: "flex items-center justify-between mt-4" },
            React.createElement("h3", { className: "text-lg font-semibold text-green-700" }, "Total Price:"),
            React.createElement("p", { className:  "text-2xl font-bold " +
                (orderStatus === 'success' ? "text-green-600" :
                orderStatus === 'error' ? "text-red-600" :
                "text-blue-700")
              },
              "$", totalPrice.toFixed(2)
            )
          ),
          React.createElement("button", {
            onClick: handleOrderTickets,
            disabled: isOrdering || totalPrice === 0,
            className: "w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200 " +
              (isOrdering ? "opacity-70 cursor-not-allowed" : "") +
              (totalPrice === 0 ? " opacity-50 cursor-not-allowed" : ""),
          },
            isOrdering ? 'Processing...' : 'Place Order'
          ),

          orderStatus !== 'idle' &&
          React.createElement("div", {
              className: "mt-4 p-4 rounded-md text-center " +
                (orderStatus === 'success' ? "bg-green-100 text-green-700 border border-green-300" :
                orderStatus === 'error' ? "bg-red-100 text-red-700 border border-red-300" :
                "bg-yellow-100 text-yellow-700 border border-yellow-300")
            },
            orderMessage
          )
        )
      )
    )
  );
};

export default TicketsPage;



// This code is a React component for a ticket ordering page. It allows users to select the number of tickets for different age groups (child, adult, senior), calculates the total price, and simulates placing an order with feedback on the order status. The UI is styled using Tailwind CSS classes.
// The component uses React hooks for state management and side effects, and it includes basic error handling for the order placement process. The ticket prices are hardcoded, but they can be easily modified or fetched from an API in a real-world application.
// The component is designed to be responsive and user-friendly, providing a smooth experience for users placing their ticket orders.
// The code also includes accessibility features, such as using appropriate HTML elements and attributes for better screen reader support. Overall, this component is a good example of how to create an interactive ticket ordering system in a React application.