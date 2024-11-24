from django.db import models


class Patient(models.Model):
    full_name = models.TextField(unique=True)
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'patients'

    def __str__(self):
        return self.full_name


class Diagnosis(models.Model):
    name = models.CharField(max_length=255)
    complaints = models.TextField()
    recommendations = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'diagnosis'

    def __str__(self):
        return self.name


class PatientVisit(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='visits')
    visit_date = models.DateTimeField(auto_now_add=True)
    complaints = models.TextField()
    disease_history = models.TextField()
    objective_status = models.TextField()
    age_category = models.CharField(
        max_length=50,
        choices=[
            ('младше 18', 'Младше 18'),
            ('18-35', '18-35'),
            ('36-60', '36-60'),
            ('старше 60', 'Старше 60'),
        ],
        null=True,
        blank=True,
    )
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.SET_NULL, null=True, blank=True)
    recommendations = models.JSONField(default=list, blank=True)
    notes = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'patient_visits'

    def __str__(self):
        return f"Visit for {self.patient.full_name} on {self.visit_date}"
