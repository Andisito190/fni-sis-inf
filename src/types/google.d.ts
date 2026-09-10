interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface GsiButtonConfiguration {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  type?: 'standard' | 'icon';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  text?: 'signin_with' | 'signin' | 'continue_with' | 'signup_with';
  width?: string;
  locale?: string;
  logo_alignment?: 'left' | 'center';
}

interface IdConfiguration {
  client_id: string;
  callback: (response: CredentialResponse) => void;
  auto_select?: boolean;
  ux_mode?: 'popup' | 'redirect';
  login_uri?: string;
  scope?: string;
}

interface GoogleOAuthLibrary {
  accounts: {
    id: {
      initialize: (config: IdConfiguration) => void;
      renderButton: (parent: HTMLElement, options: GsiButtonConfiguration) => void;
      prompt: () => void;
      disableAutoSelect: () => void;
      cancel: () => void;
    };
  };
}

interface Window {
  google?: GoogleOAuthLibrary;
}