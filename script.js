const steps = document.querySelectorAll('.step');
const formContent = document.querySelectorAll('.form-content');
const nextBtn = document.querySelectorAll('.next-btn');
const prevBtn = document.querySelectorAll('.prev-btn');
const planOptions = document.querySelectorAll('.plan');
const billingOptions = document.querySelectorAll('input[name="billing"]');
const addOns = document.querySelectorAll('.add-on');
const confirmBtn = document.querySelector('.confirm-btn');
const planName = document.querySelector('.plan-name');
const billingType = document.querySelector('.billing-type');
const price = document.querySelector('.price');
const addOnsList = document.querySelector('.add-ons-list');
const total = document.querySelector('.total');

let currentStep = 1;

// Function to activate the step
function activateStep(step) {
  steps.forEach(s => s.classList.remove('active'));
  formContent.forEach(f => f.classList.remove('active'));

  steps[step - 1].classList.add('active');
  formContent[step - 1].classList.add('active');
}

// Function to handle next button click
nextBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep++;
    activateStep(currentStep);
  });
});

// Function to handle previous button click
prevBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep--;
    activateStep(currentStep);
  });
});

// Function to handle plan selection
planOptions.forEach(plan => {
  plan.addEventListener('click', () => {
    planOptions.forEach(p => p.classList.remove('selected'));
    plan.classList.add('selected');
  });
});

// Function to handle add-on selection
addOns.forEach(addOn => {
  addOn.addEventListener('click', () => {
    addOn.classList.toggle('selected');
  });
});

// Function to handle confirmation
confirmBtn.addEventListener('click', () => {
  // Get selected plan details
  const selectedPlan = document.querySelector('.plan.selected');
  const planNameValue = selectedPlan.querySelector('h3').textContent;
  const priceValue = selectedPlan.querySelector('.price').textContent;
  
  
  // Get billing type
  const billingTypeValue = document.querySelector('input[name="billing"]:checked').value;
  
  // Get selected add-ons
  const selectedAddOns = [];
  addOns.forEach(addOn => {
    if (addOn.classList.contains('selected')) {
      selectedAddOns.push(addOn.querySelector('h3').textContent);
    }
  });
  
  // Update summary
  planName.textContent = planNameValue;
  billingType.textContent = billingTypeValue === 'monthly' ? 'Monthly' : 'Yearly';
  price.textContent = priceValue;
  
  addOnsList.innerHTML = '';
  selectedAddOns.forEach(addon => {
    const li = document.createElement('li');
    li.textContent = addon;
    addOnsList.appendChild(li);
    
  });
  
  // Calculate total
  let totalValue = parseFloat(priceValue.replace('$', '').replace('/mo', ''));
  selectedAddOns.forEach(() => {
    totalValue += 1; // Assuming all add-ons are $1/mo
  });
  
  total.textContent = `Total (${billingTypeValue === 'monthly' ? 'per month' : 'per year'}): $${totalValue.toFixed(2)}`;

  // Move to confirmation step
  currentStep = 5;
  activateStep(currentStep);
});

// Initial step activation
activateStep(currentStep);