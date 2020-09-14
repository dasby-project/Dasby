function Remove-All-Containers {
	docker container stop $(docker ps -aq)
	docker container rm $(docker ps -aq)
}
function Show-Menu {
	param (
		[string]$Title = "Locke Docker Control Script"
	)
	Clear-Host
	Write-Host "================ $Title ================"

	Write-Host "1: Crea una imagen de Docker para ser ejecutada."
	Write-Host "2: Inicia un servicio."
	Write-Host "3: Quitar un servicio."
	Write-Host "4: Muestra los registros."
	Write-Host "5: Colas de registro de un servicio."
	Write-Host "6: Empujar imagen de docker a DockerHub."
	Write-Host "7: Actualiza un servicio en ejecucion."
	Write-Host "8: Quitar todos los servicios (no se requiere servicio)."
	Write-Host "0: Salir."
}
do {
	Show-Menu
	$input = Read-Host "Seleccione una opcion"
	if ($input -ne '0' -and $input -le 8 -and -not $input -eq '') {
		$Service = $( Read-Host "Escriba el nombre del servicio" )
	}
	switch ($input) {
		'1' {
			Clear-Host
			docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" -f "$($PSScriptRoot)/docker-build.yml" build $Service
		}
		'2' {
			Clear-Host
			docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" up -d $Service
		}
		'3' {
			Clear-Host
			docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" rm -fv $Service
		}
		'4' {
			Clear-Host
			docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" logs $Service
		}
		'5' {
			Clear-Host
			docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" logs -f $Service
		}
		'6' {
			Clear-Host
			docker push $Service
		}
		'7' {
			Clear-Host
			docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" pull $Service; docker-compose -p husky -f "$($PSScriptRoot)/docker-compose.yml" up -d --force-recreate $Service
		}
		'8' {
			Clear-Host
			Remove-All-Containers
		}
	}
	pause
} until ($input -eq '0')
