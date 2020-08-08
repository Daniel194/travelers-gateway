Feature: Retrieve current account

    Background:
        Given user with the following attributes
            | id  | login | email           |
            | 400 | admin | admin@admin.com |

        When user already exists

    Scenario: Retrieve current account
        When I want to see my 'admin' account
        Then the account is found
        And his email is 'admin@admin.com'
