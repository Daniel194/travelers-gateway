Feature: Create user

    Background:
        Given user with the following attributes
            | id  | login | email           |
            | 400 | other | other@other.com |

        When user already exists

    Scenario Outline: Create user entry <testCase> <expectedResult>
        Given user wants to create an account with the following attributes
            | login   | email   |
            | <login> | <email> |
        When user save the new account '<testCase>'
        Then the save is '<expectedResult>'
        Examples:
            | testCase            | expectedResult | login | email           |
            | WITH ALL FIELDS     | SUCCESSFUL     | test  | test@test.com   |
            | WITHOUT LOGIN       | FAIL           |       | test2@test.com  |
            | WITHOUT EMAIL       | FAIL           | test2 |                 |
            | WITH INVALID EMAIL  | FAIL           | test2 | invalid-email   |
