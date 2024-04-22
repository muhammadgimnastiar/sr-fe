/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00AF5C",
        darkBlue: "#688089",
        secondary: "#26a57d",
        textColor: "#595959",
        bgGreen: "#ECEFE9",
      },
    },
  },
  plugins: ["flowbite/plugin"],
};
