// app/dashboard/requests/create-form.tsx
"use client";

import { useActionState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { CreateUserAction } from "../actions/user-actions";
import { CreateUserState } from "@/lib/types";

const initialState: CreateUserState = {
  success: false,
  message: undefined,
  dbErrors: null,
  errors: null,
};

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(
    CreateUserAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      // Mostrar notificación de éxito
      alert("Solicitud creada exitosamente");
      // Aquí puedes agregar un toast o redireccionar
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-8">
      {/* Mensajes de error/éxito */}
      {state.dbErrors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.dbErrors.message}</AlertDescription>
        </Alert>
      )}
      {state.success && (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Solicitud creada exitosamente
          </AlertDescription>
        </Alert>
      )}

      {/* Información General */}
      <Card>
        <CardHeader>
          <CardTitle>Información General</CardTitle>
          <CardDescription>Datos básicos de la solicitud</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="folio">Folio Único *</Label>
              <Input id="folio" name="folio" required />
              {state.errors && (
                <p className="text-sm text-red-500">{state.errors.folio[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="managementType">Tipo de Gestión *</Label>
              <Select name="managementType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CREATE">Alta</SelectItem>
                  <SelectItem value="UPDATE">Actualización</SelectItem>
                  <SelectItem value="MODIFICATION">Modificación</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datos del Solicitante */}
      <Card>
        <CardHeader>
          <CardTitle>Datos del Solicitante</CardTitle>
          <CardDescription>
            Información del usuario que solicita la cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo *</Label>
              <Input id="fullName" name="fullName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneExtension">Teléfono/Extensión</Label>
              <Input id="phoneExtension" name="phoneExtension" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input id="position" name="position" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departamento/Área</Label>
              <Input id="department" name="department" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeType">Tipo de Personal *</Label>
              <Select name="employeeType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EXECUTIVE">Directivo</SelectItem>
                  <SelectItem value="SENIOR_SPECIALIST">
                    Especialista Principal
                  </SelectItem>
                  <SelectItem value="TECHNICIAN">Técnico</SelectItem>
                  <SelectItem value="OTHER">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountIdentifier">Identificador de Cuenta</Label>
              <Input id="accountIdentifier" name="accountIdentifier" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Servicios de Correo */}
      <Card>
        <CardHeader>
          <CardTitle>Servicios de Correo Electrónico</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="nationalEmail" name="nationalEmail" />
              <Label htmlFor="nationalEmail">Correo Nacional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="internationalEmail" name="internationalEmail" />
              <Label htmlFor="internationalEmail">Correo Internacional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="internetEmail" name="internetEmail" />
              <Label htmlFor="internetEmail">Correo Internet</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailReason">Motivo</Label>
            <Textarea id="emailReason" name="emailReason" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Navegación Web */}
      <Card>
        <CardHeader>
          <CardTitle>Navegación Web</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="uneIntranet" name="uneIntranet" />
              <Label htmlFor="uneIntranet">Intranet UNE</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nationalIntranet" name="nationalIntranet" />
              <Label htmlFor="nationalIntranet">Intranet Nacional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="internetAccess" name="internetAccess" />
              <Label htmlFor="internetAccess">Internet</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webReason">Motivo</Label>
            <Textarea id="webReason" name="webReason" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Mensajería Instantánea */}
      <Card>
        <CardHeader>
          <CardTitle>Mensajería Instantánea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="corporateMessaging" name="corporateMessaging" />
            <Label htmlFor="corporateMessaging">Mensajería Corporativa</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="messagingReason">Motivo</Label>
            <Textarea id="messagingReason" name="messagingReason" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Redes Sociales */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="facebook" name="facebook" />
              <Label htmlFor="facebook">Facebook</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="twitter" name="twitter" />
              <Label htmlFor="twitter">Twitter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="youtube" name="youtube" />
              <Label htmlFor="youtube">YouTube</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="whatsapp" name="whatsapp" />
              <Label htmlFor="whatsapp">WhatsApp</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="telegram" name="telegram" />
              <Label htmlFor="telegram">Telegram</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="instagram" name="instagram" />
              <Label htmlFor="instagram">Instagram</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherSocialNetworks">Otras Redes</Label>
            <Input id="otherSocialNetworks" name="otherSocialNetworks" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="socialReason">Motivo</Label>
            <Textarea id="socialReason" name="socialReason" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Privilegios de Usuario */}
      <Card>
        <CardHeader>
          <CardTitle>Privilegios de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="basicUser" name="basicUser" />
              <Label htmlFor="basicUser">Usuario Básico</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="advancedUser" name="advancedUser" />
              <Label htmlFor="advancedUser">Usuario Avanzado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="localAdmin" name="localAdmin" />
              <Label htmlFor="localAdmin">Administrador Local</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="networkAdmin" name="networkAdmin" />
              <Label htmlFor="networkAdmin">Administrador de Red</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="privilegesReason">Motivo</Label>
            <Textarea id="privilegesReason" name="privilegesReason" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Acceso a la Nube */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso a la Nube UNE</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cloudAccessLevel">Nivel de Acceso</Label>
            <Select name="cloudAccessLevel">
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="READ_ONLY">Solo Lectura</SelectItem>
                <SelectItem value="MODIFY">Modificar</SelectItem>
                <SelectItem value="DELETE">Borrar</SelectItem>
                <SelectItem value="FULL_CONTROL">Control Total</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cloudReason">Motivo</Label>
            <Textarea id="cloudReason" name="cloudReason" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Tipo de Cuenta */}
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountType">Tipo *</Label>
            <Select name="accountType" required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERMANENT">Permanente</SelectItem>
                <SelectItem value="TEMPORARY">Temporal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expirationDate">Fecha de Expiración</Label>
            <Input id="expirationDate" name="expirationDate" type="date" />
          </div>
        </CardContent>
      </Card>

      {/* Días y Horas de Uso */}
      <Card>
        <CardHeader>
          <CardTitle>Días y Horas de Uso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="weekdays" name="weekdays" />
              <Label htmlFor="weekdays">Lunes a Viernes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="twentyFourHours" name="twentyFourHours" />
              <Label htmlFor="twentyFourHours">24 Horas</Label>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="afterHours" name="afterHours" />
              <Label htmlFor="afterHours">Horario Extralaboral</Label>
            </div>
            {state.data?.afterHours && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <Input
                  id="afterHoursStart"
                  name="afterHoursStart"
                  type="time"
                  placeholder="Inicio"
                />
                <Input
                  id="afterHoursEnd"
                  name="afterHoursEnd"
                  type="time"
                  placeholder="Fin"
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="saturday" name="saturday" />
              <Label htmlFor="saturday">Sábado</Label>
            </div>
            {state.data?.saturday && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <Input
                  id="saturdayStart"
                  name="saturdayStart"
                  type="time"
                  placeholder="Inicio"
                />
                <Input
                  id="saturdayEnd"
                  name="saturdayEnd"
                  type="time"
                  placeholder="Fin"
                />
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="sunday" name="sunday" />
              <Label htmlFor="sunday">Domingo</Label>
            </div>
            {state.data?.sunday && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <Input
                  id="sundayStart"
                  name="sundayStart"
                  type="time"
                  placeholder="Inicio"
                />
                <Input
                  id="sundayEnd"
                  name="sundayEnd"
                  type="time"
                  placeholder="Fin"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Acceso por APN */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso por APN</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="apnNationalEmail" name="apnNationalEmail" />
              <Label htmlFor="apnNationalEmail">Correo Nacional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="apnInternationalEmail"
                name="apnInternationalEmail"
              />
              <Label htmlFor="apnInternationalEmail">
                Correo Internacional
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="apnInternet" name="apnInternet" />
              <Label htmlFor="apnInternet">Internet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="apnCellularNumber" name="apnCellularNumber" />
              <Label htmlFor="apnCellularNumber">Número Celular</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medios Informáticos */}
      <Card>
        <CardHeader>
          <CardTitle>Medios Informáticos Autorizados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="authorizedPcName">Nombre PC Autorizado</Label>
            <Input id="authorizedPcName" name="authorizedPcName" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authenticationPcs">PCs de Autenticación</Label>
            <Textarea
              id="authenticationPcs"
              name="authenticationPcs"
              rows={3}
              placeholder="Lista de PCs separados por coma"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authorizedSoftware">Software Autorizado</Label>
            <Textarea
              id="authorizedSoftware"
              name="authorizedSoftware"
              rows={3}
              placeholder="Lista de software autorizado"
            />
          </div>
        </CardContent>
      </Card>

      {/* Flujo de Aprobación */}
      <Card>
        <CardHeader>
          <CardTitle>Flujo de Aprobación</CardTitle>
          <CardDescription>
            Información de quienes aprueban la solicitud
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Solicitado por */}
          <div className="space-y-4">
            <h4 className="font-medium">Solicitado por (Director del Área)</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                id="requestedByName"
                name="requestedByName"
                placeholder="Nombre"
              />
              <Input
                id="requestedByRole"
                name="requestedByRole"
                placeholder="Cargo"
              />
              <Input id="requestedByDate" name="requestedByDate" type="date" />
            </div>
          </div>

          <Separator />

          {/* Revisado por */}
          <div className="space-y-4">
            <h4 className="font-medium">Revisado por (Especialista/Técnico)</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                id="reviewedByName"
                name="reviewedByName"
                placeholder="Nombre"
              />
              <Input
                id="reviewedByRole"
                name="reviewedByRole"
                placeholder="Cargo"
              />
              <Input id="reviewedByDate" name="reviewedByDate" type="date" />
            </div>
          </div>

          <Separator />

          {/* Aprobado por */}
          <div className="space-y-4">
            <h4 className="font-medium">Aprobado por (Director General)</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                id="approvedByName"
                name="approvedByName"
                placeholder="Nombre"
              />
              <Input
                id="approvedByRole"
                name="approvedByRole"
                placeholder="Cargo"
              />
              <Input id="approvedByDate" name="approvedByDate" type="date" />
            </div>
          </div>

          <Separator />

          {/* Ejecutado por */}
          <div className="space-y-4">
            <h4 className="font-medium">
              Ejecutado por (Especialista de Configuración)
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                id="executedByName"
                name="executedByName"
                placeholder="Nombre"
              />
              <Input
                id="executedByRole"
                name="executedByRole"
                placeholder="Cargo"
              />
              <Input id="executedByDate" name="executedByDate" type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón de envío */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Creando..." : "Crear Solicitud"}
        </Button>
      </div>
    </form>
  );
}
