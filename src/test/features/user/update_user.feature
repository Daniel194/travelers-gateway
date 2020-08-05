Feature: Update user

    Background:
        Given user with the following attributes
            | id  | login  | password | email           |
            | 400 | other1 | aaaaaaaa | other@other.com |
            | 500 | other2 | aaaaaaaa | exist@other.com |

        When user already exists

    Scenario Outline: Update user entry <testCase> <expectedResult>
        Given user wants to update an account with the following attributes
            | id   | login   | email   |
            | <id> | <login> | <email> |
        When user update the new account '<testCase>'
        Then the update is '<expectedResult>'
        Examples:
            | testCase            | expectedResult | login  | email            |
            | WITH ALL FIELDS     | SUCCESSFUL     | other1 | other1@other.com |
            | WITHOUT EMAIL       | FAIL           | other1 |                  |
            | WITH INVALID EMAIL  | FAIL           | other1 | invalid-email    |
            | WITH EXISTING EMAIL | FAIL           | other1 | exist@other.com  |
