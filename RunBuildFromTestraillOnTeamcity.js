name: Run tests
description: Triggers automated tests
author: Evgeny Hramov
version: 1.0
includes: ^runs/view
excludes: 

js:
$(document).ready(
	function() {
		document.domain = document.domain
		/* Create the button */
		var button = $('<div class="toolbar content-header-toolbar"><a class="toolbar-button toolbar-button-last toolbar-button-first content-header-button button-start" href="javascript:void(0)">Запустить UI тесты</a></div>');

		/* Add it to the toolbar */
		$("#content-header .content-header-inner").prepend(button);		

		/* Bind the click event to trigger the automated tests */
		$("a", button).click(
			function()
			{
				var somejson = {
          "branchName": "<set heere branch name>",
          "buildType": {
            "id": "<set heere build name>"
          },
          "properties": {
            "property": [
              {
                "name": "env.testrail_run_id",
                "value": + uiscripts.context.run.id
              }
            ]
          }
        }
				$.ajax({
					url: "https://<url to teamcity>/app/rest/buildQueue",
					dataType: "json",
					type: "POST",
					crossDomain : true,
					headers: {
						"Authorization": "Bearer <teamcity auth tocken>",
            "Content-Type": "application/json"
					},
					data: JSON.stringify(somejson),
					processData: false,
					success: function()
					{
						// location.reload();
						App.Dialogs.message('Тесты успешно запущены на teamcity. Статус тестов будет автоматически проставлен в TestRail.', 'Успех');
					},
					error: function()
					{
						App.Dialogs.error('An error occurred while trying to trigger the automated tests.');
					}
				});

				return false;
			}
		);
	}
);
