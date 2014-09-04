PlastiqApp::Application.routes.draw do
 root :to => "site#root"
 resources :payees
end
