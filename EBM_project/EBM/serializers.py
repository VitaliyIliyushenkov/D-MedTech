from rest_framework import serializers
from .models import Patient, PatientVisit, Diagnosis

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = '__all__'


class PatientVisitSerializer(serializers.ModelSerializer):
    diagnosis = DiagnosisSerializer()
    recommendations = serializers.ListField(child=serializers.CharField(), allow_null=True, required=False)  # Исправлено
    notes = serializers.CharField(allow_null=True, required=False)
    visit_date = serializers.SerializerMethodField()

    class Meta:
        model = PatientVisit
        fields = '__all__'

    def get_visit_date(self, obj):
        return obj.visit_date.strftime('%d-%m-%Y %H:%M')

    def get_diagnosis_name(self, obj):
        if obj.diagnosis_id:
            try:
                diagnosis = Diagnosis.objects.get(id=obj.diagnosis_id)
                return diagnosis.name
            except Diagnosis.DoesNotExist:
                return None
        return None
