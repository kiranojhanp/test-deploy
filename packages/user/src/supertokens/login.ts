import { toast } from "react-toastify";
import Session from "supertokens-web-js/recipe/session";
import {
  EmailPasswordUserType,
  emailPasswordSignIn,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";

import logout from "./logout";

import type { LoginCredentials } from "../types/types";

interface IPromise {
  user: EmailPasswordUserType | undefined;
  status: string | undefined;
}

const login = async (
  credentials: LoginCredentials
): Promise<IPromise | undefined> => {
  let user: EmailPasswordUserType | undefined;
  let status: string | undefined;

  const data = {
    formFields: [
      {
        id: "email",
        value: credentials.email,
      },
      {
        id: "password",
        value: credentials.password,
      },
    ],
  };

  try {
    const response = await emailPasswordSignIn(data);
    if (response.status === "OK") {
      user = response.user;
      status = response.status;
    } else {
      status = response.status;
      toast.error(status);
    }
  } catch (err) {
    let errorMessage = "Oops! Something went wrong.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    toast.error(errorMessage);
  }

  return { user, status };
};

async function verifySession(
  claim: string,
  redirectURL?: string
): Promise<boolean> {
  if (await Session.doesSessionExist()) {
    const validationErrors = await Session.validateClaims({
      overrideGlobalClaimValidators: (globalValidators) => [
        ...globalValidators,
        UserRoleClaim.validators.includes(claim),
        /* PermissionClaim.validators.includes("modify") */
      ],
    });

    if (validationErrors.length === 0) {
      return true;
    }

    for (const err of validationErrors) {
      if (err.validatorId === UserRoleClaim.id) {
        // user roles claim check failed
        if (redirectURL) {
          window.location.href = redirectURL;
        } else {
          await logout();
        }
        // toast.error("You don't have permission for the app");
      } else {
        // some other claim check failed (from the global validators list)
      }
    }
  }
  // either a session does not exist, or one of the validators failed.
  // so we do not allow access to this page.
  return false;
}

export default login;
export { verifySession };
