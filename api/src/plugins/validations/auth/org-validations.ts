import { shouldCheckAuthStrength } from "./auth-rules";

/*
 * Given an email address, extract the org name
 * from the domain. eg: aj@google.com -> google.
 */
const orgFromEmail = email => {
  if (!email || typeof email !== "string" || email.length === 1) {
    return "";
  }
  return email.split("@")[1].split(".")[0];
};

/*
 *
 */
const domainFromEmail = email => {
  if (!email) {
    return "";
  }
  return email.split("@")[1];
};

/*
 * Check the email used, if the email ends with the
 * name of the allowed org, then them them in.
 */
const isInAllowedOrgs = () => async context => {
  if (!shouldCheckAuthStrength()) {
    return context;
  }

  const domain = domainFromEmail(context.data.email);
  const allowedOrgs = await context.app.service("allowed-orgs").find({
    query: { domain }
  });

  if (allowedOrgs.total === 0) {
    throw new Error(`Organization domain "${domain}" is not allowed.`);
  }

  return context;
};

const handleOrgValidationForDev = async context => {
  const { email } = context.data;
  const { user } = context.params;
  const domain = domainFromEmail(email);

  console.log("**".repeat(20));
  console.log(context.params, context.data);
  console.log("**".repeat(20));

  if (context.data.githubId > 0) {
    context.data.orgId = "github.com";
    context.data.orgName = "github";
    context.data.auth = "oath_github";
    return context;
  }

  const allowedOrgs = await context.app.service("allowed-orgs").find({
    user,
    query: { domain }
  });

  // if (!allowedOrgs.total) {
  //   throw new Error(
  //     "Your organization is not listed, please contact your Admin."
  //   );
  // }

  // context.data.orgId = allowedOrgs.data[0].domain;
  // context.data.orgName = allowedOrgs.data[0].name;

  context.data.orgId = domain;
  context.data.orgName = domain;
  context.data.auth = "local";

  return context;
};

const setOrgId = () => async context => {
  const { user } = context.params;

  if (!shouldCheckAuthStrength()) {
    return handleOrgValidationForDev(context);
  }

  const allowedOrgs = await context.app.service("allowed-orgs").find({
    user,
    query: { domain: domainFromEmail(context.data.email) }
  });

  if (!allowedOrgs.total) {
    throw new Error("Could not find the matching org.");
  }

  context.data.orgId = allowedOrgs.data[0].domain;
  context.data.orgName = allowedOrgs.data[0].name;

  return context;
};

export { isInAllowedOrgs, domainFromEmail, orgFromEmail, setOrgId };
