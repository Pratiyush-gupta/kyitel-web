/**
 * Your user will be redirected to the refresh_url in these cases:
 * - The link is expired (a few minutes went by since the link was created)
 * - The link was already visited (the user refreshed the page or clicked back or forward in the browser)
 * - Your platform is no longer able to access the account
 * - The account has been rejected
 * Read more at https://stripe.com/docs/connect/standard-accounts#refresh_url
 */
//require('dotenv').config({ path: require('find-config')('.env') })
const SECRET_KEY = "sk_test_51Oorb2IzJ30ojTomXAva2sw6OjRP65O81yIxHsq6yPQBmOfxQx0AM3N5upllMQmgNU6nyZyDsYpfvC3UCWtTowpS00MlCk6wQr"
const stripe = require("stripe")(SECRET_KEY)
const host = process.env.NEXT_PUBLIC_HOST

const stripeReAuth = async (req, res) => {
  const { account_id: accountId } = req.query

  const accountLinks = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${host}/api/stripe/account/reauth?account_id=${accountId}`,
    return_url: `${host}/register?account_id=${accountId}`,
    type: "account_onboarding",
  })
  res.redirect(accountLinks.url)
}

export default stripeReAuth
